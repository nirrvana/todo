# todo #
해야 할 일들을 (로컬스토리지에) 메모할 수 있는 간단한 웹 앱

## 설치 ##
* 방법1 : [github page](https://nirrvana.github.io/todo)
* 방법2 : git clone https://github.com/nirrvana/todo.git

## 사용방법 ##
* Group
  * 추가 :`Add Group` 클릭  → 그룹명 입력  → `V` 클릭 or 엔터  
  * 삭제 : 그룹명 hover  → `X` 클릭
  * 수정 : 그룹명 hover  → `rename` 클릭

* Todo
  * 추가 : (todo를 추가 할) 그룹명 클릭  → `+` 클릭  → 내용 입력  → `V` 클릭 or 엔터
  * 삭제 : todo 내용 hover  → `X` 클릭
  * 수정 : todo 내용 클릭  → 내용 수정  → `V` 클릭 or 엔터
  * 완료 : 체크박스 클릭 (완료된 목록으로 이동)
  * 완료취소 : 완료된 목록에서 체크박스 클릭 

## 코드상태 ##
  서버가 없이 클라이언트 코드로만 작성되었으며, 서버의 Controller 역할을 Api.js가 대신
  
* GroupList  
  * local storage에서 group list를 받아와 mapping하는 컴포넌트
  * group 추가에 관한 부분 담당
  * 수정계획
    * 그룹명이 길어질 경우 영역 밖으로 튀어나오지 않고 ...처리 되도록
    * 그룹명을 정확히 hover하지 않고 그룹명 포함 영역을 hover시 `x`, `rename`버튼 보이도록
    * todo 작업 중인 때 그룹의 color를 바꾸어 주어 해당 그룹에서 작업 중임을 직관적으로 알 수 있도록

* GroupEntry
  * list의 각 group 내용에 관한 부분을 담당하는 컴포넌트
  * group 수정 및 삭제 부분 담당
  * 수정계획
    * event propagation api를 사용해 이벤트 전파를 컨트롤
    * 그룹명이 길어질 영역 밖으로 튀어나오지 않고 ...처리 되도록
    * 그룹명 수정 상태 때 해당 그룹의 color를 바꾸어 주어 해당 그룹에서 작업 중임을 직관적으로 알 수 있도록
    * 그룹명 수정 시 뜨는 input창의 css 요소를 없애 input창에서 편집하는 느낌이 들지 않도록
    * 그룹명 수정 시 뜨는 input창의 외부 영역 클릭 시 input 창이 닫히도록
    
* TodoList
  * store에서 todo list를 받아와 mapping하는 컴포넌트
  * todo 추가에 관한 부분 담당
  * 수정계획
    * 빈 todo 제출 시 뜨는 modal 창의 close 버튼을 눌러도 입력 중인 input 창이 닫히지 않도록
    * todo가 길어질 경우 영역 밖으로 튀어나오지 않고 ...처리 되도록
    * todo 추가 시 뜨는 input창의 css 요소를 없애 input창에서 편집하는 느낌이 들지 않도록
    * todo 추가 시 뜨는 input창의 외부 영역 클릭 시 input 창이 닫히도록
    
* TodoEntry
  * todo 수정 및 삭제 부분 담당
  * 수정계획
    * event propagation api를 사용해 이벤트 전파를 컨트롤
    * todo가 길어질 경우 영역 밖으로 튀어나오지 않고 ...처리 되도록
    * todo 수정 상태일 때 해당 todo의 color를 바꾸어 주어 해당 todo에서 작업 중임을 직관적으로 알 수 있도록
    * todo 수정 시 뜨는 input창의 css 요소를 없애 input창에서 편집하는 느낌이 들지 않도록
    * todo 수정 시 뜨는 input창의 외부 영역 클릭 시 input 창이 닫히도록

* 향후계획
  * 각 컴포넌트 수정계획 리스트를 코드에 반영
  * 작성된 todo 갯수 대비 완료된 todo 갯수를 표시할 수 있는 badge 추가
  * 인증 과정 
  * UI 업그레이드
  * 코드리뷰 및 리팩토링
  * 서버 코드를 작성하여 todo를 local storage 대신 db에 저장 (마지막)
