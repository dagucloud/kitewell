---
title: 다른 시스템에서 Kitewell 호출하기
---

Camunda, intra-mart, n8n 같은 워크플로 플랫폼이나 작업 스케줄러, EAI 도구는 자기 흐름의 작업 하나를 Kitewell에 맡길 수 있습니다. 상대 시스템이 Kitewell 워크플로를 시작하고, 값을 넘기고, 결과를 돌려받습니다. Kitewell은 웹사이트나 데스크톱 앱처럼 API가 없는 부분을 맡습니다.

방법은 두 가지입니다. 상대 시스템이 결과를 어떻게 받고 싶은지에 따라 고르세요.

| | 웹후크 | REST API |
| --- | --- | --- |
| 실행 시작 | 워크플로의 웹후크 URL로 `POST` | `POST /api/jobs/{id}/run` |
| 값 전달 | 요청 본문 | 요청 본문의 `params` |
| 결과 받기 | 워크플로의 마지막 단계가 보냄 | 실행을 읽음 |
| 컴퓨터에 닿는 경로 | Kitewell 릴레이를 거치며 설정 불필요 | 직접 마련한 주소 |
| 컴퓨터가 잠자기 상태일 때 | 요청이 릴레이에서 최대 7일 대기 | 호출이 닿지 않음 |

## 필요한 것

- 그 작업을 하는 저장된 워크플로.
- 워크플로가 있는 컴퓨터에서 Kitewell이 열려 있을 것. 실행은 그 컴퓨터가 잠자기 상태가 아닐 때만 시작됩니다.
- 웹후크라면 Kitewell이 Dagu Cloud에 [로그인](/ko/docs/cloud-sync/#sign-in)되어 있을 것.
- REST라면 **워크플로 실행** 권한이 있는 API 키. 만드는 방법은 [이 컴퓨터의 어시스턴트 연결하기](/ko/docs/mcp/#이-컴퓨터의-어시스턴트-연결하기)를 참고하세요.

## 웹후크로 시작하기

웹후크는 HTTP `POST`를 보내고 다음으로 넘어가는 시스템에 알맞습니다. 네트워크에 포트를 열 필요가 없습니다.

1. [웹후크 켜기](/ko/docs/webhooks/#웹후크-켜기)대로 워크플로의 웹후크를 켜고 URL을 복사합니다.
2. 상대 시스템에 그 URL로 `POST`하는 단계를 추가하고, 작업에 필요한 값을 JSON 등으로 본문에 담습니다.
3. 요청을 하나 보내게 합니다. Kitewell의 **최근 요청**에서 그 요청 옆의 **세부 정보**를 선택한 다음 **이 요청으로 단계 만들기**를 선택합니다. 어시스턴트가 본문에서 값을 꺼내는 단계를 추가합니다.

단계는 본문을 `WEBHOOK_PAYLOAD`에서 읽습니다. 보낸 쪽이 보낸 그대로이므로 신뢰할 수 없는 값으로 다루세요. [단계에서 요청 읽기](/ko/docs/webhooks/#단계에서-요청-읽기)를 참고하세요.

릴레이는 곧바로 `202`로 응답하며, 본문은 `{"id": "…"}`와 같습니다. 요청이 도착했다는 뜻일 뿐, 실행 결과가 아닙니다.

웹후크가 [요청을 보낸 쪽을 확인](/ko/docs/webhooks/#check-who-sent-the-request)하지 않으면 URL을 가진 누구나 워크플로를 시작할 수 있으므로, 비밀번호처럼 비공개로 두세요. URL 하나는 1분에 요청을 60개까지 받습니다. [한도](/ko/docs/webhooks/#한도)를 참고하세요.

## REST API로 시작하기

REST는 실행을 시작한 뒤 끝날 때까지 지켜보는 시스템에 알맞습니다. 모든 요청에 `Authorization: Bearer <your key>`를 붙입니다.

1. `GET /api/jobs`로 워크플로의 ID를 찾습니다.
2. `POST /api/jobs/{id}/run`으로 실행을 시작합니다. 값은 `params` 아래에 워크플로 [입력](/ko/docs/workflow-builder/#실행할-때마다-바뀌는-값)의 이름으로 넣습니다.
3. 키가 여러 프로젝트에 접근할 수 있다면 `?projectId=<id>`로 프로젝트를 지정합니다. [프로젝트 지정하기](/ko/docs/mcp/#프로젝트-지정하기)를 참고하세요.

```http
POST /api/jobs/{id}/run HTTP/1.1
Host: your-host
Authorization: Bearer <Kitewell API key>
Content-Type: application/json

{"params":{"region":"west"}}
```

Kitewell은 `127.0.0.1:19742`에서 이 컴퓨터의 연결만 받습니다. 다른 서버에 있는 시스템에는 HTTPS로 닿을 수 있는 주소가 필요하며, 이 주소는 직접 마련하고 운영합니다. 자체 프록시를 쓰거나 Kitewell에 인증서를 설정하세요. [다른 컴퓨터의 클라이언트](/ko/docs/mcp/#다른-컴퓨터의-클라이언트)를 참고하세요.

## 결과 받기

REST에서는 실행을 읽습니다. `GET /api/runs`는 실행 목록을, `GET /api/runs/{jobId}/{id}`는 실행 하나를 읽습니다. 끝날 때까지 다시 읽으세요. `GET /api/runs/{jobId}/{id}/logs`는 단계가 쓴 내용을 돌려줍니다. `stepId`와 `stream=stdout`을 지정하면 결과를 출력하는 단계만 읽습니다.

웹후크에서는 워크플로가 직접 결과를 보냅니다. 마지막에 **웹 서비스 호출** 단계나 [가져온 API](/ko/docs/apis/) 작업을 두어 상대 시스템을 호출합니다. 상대 시스템이 프로세스 ID 같은 자기 참조 값을 본문에 넣게 하고, 그 값을 결과와 함께 돌려보냅니다.

## 단계가 사람을 기다릴 때

워크플로는 사람을 기다리며 멈출 수 있습니다. 단계 뒤의 승인이나, 단계 앞에 둔 **사람에게 요청** 단계입니다. [멈추고 사람에게 묻기](/ko/docs/workflow-builder/#stop-and-ask-a-person)를 참고하세요. 실행은 거기서 기다리고, 상대 시스템의 작업도 함께 기다립니다.

어느 쪽에서든 그 단계를 처리할 수 있습니다.

- 사람이 Kitewell의 **실행 및 로그 → 대기 중**에서 처리합니다. 입력을 기다리는 실행은 [알림](/ko/docs/alerts/)으로 알려 줄 수 있습니다.
- 상대 시스템이 **워크플로 실행** 권한으로 REST를 통해 처리합니다. 승인에는 `POST /api/runs/{jobId}/{id}/approvals/{stepId}/approve`, `/reject`, `/push-back`을, 사람의 작업에는 `POST /api/runs/{jobId}/{id}/human-tasks/{stepId}/complete`를 씁니다.

자체 작업 목록이 있는 플랫폼이라면 거기서 사용자에게 승인을 보여 주고, 그 답을 Kitewell에 넘길 수 있습니다.
