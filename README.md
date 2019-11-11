# tinkerbell

[피터팬의 좋은방 구하기][peterpan]에 올라온 새 방 GitHub actions로 받아보기

## 사용법

### 1. 저장소 포크 또는 복제

tinkerbell은 git에 체크인 된 데이터를 기반으로 이슈를 생성하는 식으로 동작합니다.
본인이 어떤 조건으로 어느 지역에 방을 찾고 있는지 공개되어도 괜찮다면 저장소를 포크해서 사용하세요.
꺼려진다면, 포크 대신 Private 저장소로 [이 저장소를 복제][duplicate-repo]해서 사용하세요.

### 2. 데이터 변경

포크 또는 복제를 마쳤으면 원하는 지역 데이터를 git에 체크인해야 합니다.
`.gitignore`에서 `.src/data/candidates.ts`를 제거하세요.
그 후 `candidates.example.ts`를 참고해 `candidates.ts` 파일을 작성한 뒤 커밋 후 푸시하세요.

- `rentBudget`, `depositBudget`으로 월세, 보증금 한도를 설정합니다.
- 원하는 지역을 포함하도록 `bounds`를 설정합니다. (피터팬 웹사이트에서 원하는 지역이 포함되도록 지도를 설정한 후 주소창 또는 API 요청에 사용되는 `latitude`, `longitude`를 참고하면 쉽습니다)
- 원하는 층수(`roomFloors`), 방 갯수(`roomCounts`), 계약 종류(`contractTypes`), 반지하 등 포함여부 (`shouldInclude...`)를 설정합니다.

### 3. 설정 커스터마이즈 (선택)

- 받아보는 시간을 바꾸고 싶다면 (기본: 매일 오전 11시): `.github/workflows/create-issue.yml`의 `cron` 항목을 변경하세요.
- "새 방"으로 판단하는 시간을 바꾸고 싶다면 (기본: 어제 또는 오늘): `src/models/House.ts`의 `isNew` 로직을 수정하세요.

[peterpan]: https://www.peterpanz.com/
[duplicate-repo]: https://help.github.com/en/github/creating-cloning-and-archiving-repositories/duplicating-a-repository
