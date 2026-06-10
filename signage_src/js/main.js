// 부서별 색상 매핑 (color 값 → CSS 클래스/색상)
const DEPARTMENT_COLORS = {
	service: 'blue',      // 서비스개발실
	solution: 'cyan',     // 솔루션연구소
	platform: 'green',    // 플랫폼개발실
	sales: 'lime',        // 영업/기획실
	dx: 'orange',         // DX사업실
	management: 'pink'    // 경영관리팀
};

// 조직도 데이터를 JSON에서 가져와서 UI 렌더링
async function initOrganization() {
	try {
		const response = await fetch('./signage_src/data/organization.json');
		const orgData = await response.json();
		renderOrganization(orgData);
	} catch (error) {
		console.error('조직도 데이터 로드 실패:', error);
	}
}

// 임원진 렌더링 (CEO, VP)
function renderExecutives(executives) {
	const list = document.querySelector('.org-executive-list');
	if (!list) return;

	const ceo = executives.find(e => e.type === 'ceo');
	const vp = executives.find(e => e.type === 'vp');

	list.innerHTML = '';

	if (ceo) {
		list.appendChild(createExecutiveElement(ceo, 'ceo'));
	}
	if (vp) {
		list.appendChild(createExecutiveElement(vp, 'vp'));
	}
}

// 임원 엘리먼트 생성
function createExecutiveElement(executive, type) {
	const li = document.createElement('li');
	li.className = `org-member org-member-${type}`;

	// CEO: wrapper div 사용, VP: 직접 img 사용
	if (type === 'ceo') {
		const avatarWrapper = document.createElement('div');
		avatarWrapper.className = 'org-member-avatar-wrapper';

		const img = document.createElement('img');
		img.src = executive.avatar;
		img.alt = `${executive.name} 프로필`;

		avatarWrapper.appendChild(img);
		li.appendChild(avatarWrapper);
	} else {
		const img = document.createElement('img');
		img.className = 'org-member-avatar';
		img.src = executive.avatar;
		img.alt = `${executive.name} 프로필`;

		li.appendChild(img);
	}

	const infoDiv = document.createElement('div');
	infoDiv.className = 'org-member-info';

	const titleSpan = document.createElement('span');
	titleSpan.className = 'org-member-title';
	titleSpan.textContent = executive.title;

	const nameSpan = document.createElement('span');
	nameSpan.className = 'org-member-name';
	nameSpan.textContent = executive.name;

	infoDiv.appendChild(titleSpan);
	infoDiv.appendChild(nameSpan);

	li.appendChild(infoDiv);

	return li;
}

// 조직도 렌더링
function renderOrganization(orgData) {
	// 임원진 렌더링
	renderExecutives(orgData.executives);

	// 부서 목록 렌더링
	const deptList = document.querySelector('.org-dept-list');
	if (!deptList) return;

	deptList.innerHTML = '';

	orgData.departments.forEach(dept => {
		const deptSection = createDepartmentElement(dept);
		deptList.appendChild(deptSection);
	});
}

// 부서 엘리먼트 생성
function createDepartmentElement(dept) {
	const section = document.createElement('section');

	// 색상 매핑 확인 및 클래스명 생성
	const colorClass = dept.color && DEPARTMENT_COLORS[dept.color]
		? `org-dept-${dept.color}`
		: 'org-dept-service'; // 기본값

	section.className = `org-dept ${colorClass}`;

	console.log(`부서: ${dept.name}, color: ${dept.color}, className: ${colorClass}`); // 디버깅

	const isNoTeams = !dept.teams || dept.teams.length === 0;

	// 팀이 없는 경우 (영업/기획실 등) 특수 클래스 추가
	if (isNoTeams) {
		section.classList.add('org-dept-no-teams');
	}

	// 부서장이 없고 팀이 있는 경우 특수 클래스 추가
	if (!dept.head && !isNoTeams) {
		section.classList.add('org-dept-team-only');
	}

	// 부서명 (팀이 없거나 부서장이 있을 때 추가)
	if (isNoTeams || dept.head) {
		const deptName = document.createElement('h2');
		deptName.className = 'org-dept-name';
		deptName.textContent = dept.name;
		section.appendChild(deptName);
	}

	// 부서장이 있으면 표시
	if (dept.head) {
		const deptHead = document.createElement('div');
		deptHead.className = 'org-dept-head';
		const headMember = createMemberElement(dept.head, false);
		deptHead.appendChild(headMember);
		section.appendChild(deptHead);
	}

	// 팀 목록
	if (dept.teams && dept.teams.length > 0) {
		const teamList = document.createElement('div');
		teamList.className = 'org-team-list';

		dept.teams.forEach(team => {
			const teamElement = createTeamElement(team, dept.color, isNoTeams);
			teamList.appendChild(teamElement);
		});

		section.appendChild(teamList);
	} else if (dept.members && dept.members.length > 0) {
		// 팀이 없지만 멤버가 있는 경우 (영업기획실: 실만 있는 케이스)
		const memberList = document.createElement('ul');
		memberList.className = 'org-member-list';

		if (dept.members.length >= 10) {
			memberList.classList.add('org-team-wide');
		}

		dept.members.forEach(member => {
			const li = createMemberElement(member, true);
			memberList.appendChild(li);
		});
		section.appendChild(memberList);
	}

	return section;
}

// 팀 엘리먼트 생성
function createTeamElement(team, deptColor, skipTeamName = false) {
	const div = document.createElement('div');
	div.className = 'org-team';

	// 팀명 (skipTeamName이 false일 때만 추가)
	if (!skipTeamName) {
		const teamName = document.createElement('h3');
		teamName.className = 'org-team-name';

		const parts = team.name.split(' ');
		if (parts.length > 1) {
			const mainText = document.createTextNode(parts[0] + ' ');
			const emText = document.createElement('em');
			emText.textContent = parts[1];
			teamName.appendChild(mainText);
			teamName.appendChild(emText);
		} else {
			teamName.textContent = team.name;
		}

		div.appendChild(teamName);
	}

	// 팀원 목록
	const memberList = document.createElement('ul');
	memberList.className = 'org-member-list';

	// 10명 이상이면 2열 레이아웃
	if (team.members && team.members.length >= 10) {
		div.classList.add('org-team-wide');
	}

	if (team.members) {
		team.members.forEach(member => {
			const li = createMemberElement(member, true);
			memberList.appendChild(li);
		});
	}

	div.appendChild(memberList);

	return div;
}

// 직원 엘리먼트 생성 (isLi: true면 li로, false면 div로 감싸기)
function createMemberElement(member, isLi = true) {
	const container = isLi ? document.createElement('li') : document.createElement('div');
	container.className = 'org-member';

	// 상태 클래스 추가
	if (member.status === 'new') {
		container.classList.add('org-member-new');
	} else if (member.status === 'dispatched') {
		container.classList.add('org-member-dispatched');
	}

	// 아바타
	const img = document.createElement('img');
	img.className = 'org-member-avatar';
	img.src = member.avatar;
	img.alt = member.name;

	// 정보
	const infoDiv = document.createElement('div');
	infoDiv.className = 'org-member-info';

	const titleSpan = document.createElement('span');
	titleSpan.className = 'org-member-title';
	titleSpan.textContent = member.title;

	const nameSpan = document.createElement('span');
	nameSpan.className = 'org-member-name';
	nameSpan.textContent = member.name;

	infoDiv.appendChild(titleSpan);
	infoDiv.appendChild(nameSpan);

	container.appendChild(img);
	container.appendChild(infoDiv);

	return container;
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initOrganization);
