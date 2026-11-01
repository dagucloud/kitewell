---
title: 从其他系统调用 Kitewell
---

Camunda、intra-mart、n8n 等工作流平台，作业调度器，或 EAI 工具，都可以把自己流程中的一项任务交给 Kitewell。对方系统启动 Kitewell 工作流、传入值并取回结果。Kitewell 负责其中没有 API 的部分，例如网站或桌面应用。

有两种方式。按对方系统希望怎样取回结果来选择。

| | Webhook | REST API |
| --- | --- | --- |
| 如何启动运行 | 向工作流的 Webhook URL 发送 `POST` | `POST /api/jobs/{id}/run` |
| 如何传入值 | 请求正文 | 请求正文中的 `params` |
| 如何取回结果 | 由工作流的最后一步发送 | 读取运行 |
| 如何到达你的电脑 | 经由 Kitewell 的中继，无需设置 | 通过你自己设置的地址 |
| 电脑睡眠时 | 请求在中继等待，最长 7 天 | 调用无法到达 |

## 准备工作

- 一个完成这项任务的已保存工作流。
- 在保存该工作流的电脑上打开 Kitewell。只有在这台电脑没有睡眠时，运行才会开始。
- 使用 Webhook 时，Kitewell 已[登录](/zh/docs/cloud-sync/#sign-in) Dagu Cloud。
- 使用 REST 时，需要一个具有 **运行工作流** 权限的 API 密钥，创建方法见[连接这台电脑上的助手](/zh/docs/mcp/#连接这台电脑上的助手)。

## 通过 Webhook 启动

Webhook 适合发送 HTTP `POST` 后就继续往下走的系统。无需在你的网络上开放端口。

1. 按照[开启 Webhook](/zh/docs/webhooks/#开启-webhook) 开启工作流的 Webhook，并复制它的 URL。
2. 在对方系统中添加一个向该 URL 发送 `POST` 的步骤，把任务需要的值放进正文，例如用 JSON。
3. 让它发送一个请求。在 Kitewell 的 **最近的请求** 下，选择该请求旁边的 **详情**，再选择 **根据此请求构建步骤**。助手会添加从正文中取出这些值的步骤。

步骤从 `WEBHOOK_PAYLOAD` 读取正文。正文就是发送方发来的原样内容，请把它视为不可信；参见[在步骤中读取请求](/zh/docs/webhooks/#在步骤中读取请求)。

中继会立即返回 `202`，正文类似 `{"id": "…"}`。这只表示请求已送达，并不说明运行的结果。

除非 Webhook 会[确认请求的发送方](/zh/docs/webhooks/#check-who-sent-the-request)，否则任何拥有此 URL 的人都能启动工作流，所以请像对待密码一样保管它。每个 URL 每分钟最多接受 60 个请求；参见[限制](/zh/docs/webhooks/#限制)。

## 通过 REST API 启动

REST 适合启动运行后一直跟踪到结束的系统。每个请求都要带上 `Authorization: Bearer <your key>`。

1. 用 `GET /api/jobs` 查到工作流的 ID。
2. 用 `POST /api/jobs/{id}/run` 启动运行。把值放在 `params` 下，名称与工作流的[输入](/zh/docs/workflow-builder/#每次都会变化的内容)一致。
3. 如果密钥能访问多个项目，用 `?projectId=<id>` 指定项目；参见[选择项目](/zh/docs/mcp/#选择项目)。

```http
POST /api/jobs/{id}/run HTTP/1.1
Host: your-host
Authorization: Bearer <Kitewell API key>
Content-Type: application/json

{"params":{"region":"west"}}
```

Kitewell 在 `127.0.0.1:19742` 监听，只接受这台电脑的连接。位于其他服务器上的系统需要一个可通过 HTTPS 访问的地址，由你自行设置和运维：可以通过你自己的代理，也可以在 Kitewell 中配置证书。参见[其他电脑上的客户端](/zh/docs/mcp/#其他电脑上的客户端)。

## 取回结果

使用 REST 时，读取运行。`GET /api/runs` 列出运行，`GET /api/runs/{jobId}/{id}` 读取其中一个；反复读取，直到它结束。`GET /api/runs/{jobId}/{id}/logs` 返回各步骤写出的内容。指定 `stepId` 和 `stream=stdout`，就只读取输出结果的那个步骤。

使用 Webhook 时，由工作流自己发送结果。在最后放一个 **调用 Web 服务** 步骤，或一个[导入的 API](/zh/docs/apis/) 操作，用来调用对方系统。让对方系统把自己的引用（例如流程 ID）放进正文，再把这个引用连同结果一起发回。

## 当某个步骤等待人工处理时

工作流可以停下来等人：在某个步骤之后的审批，或放在某个步骤之前的 **请求人工处理** 步骤。参见[停下来询问某个人](/zh/docs/workflow-builder/#stop-and-ask-a-person)。运行会在那里等待，对方系统的任务也随之等待。

双方都可以处理这个步骤：

- 由人在 Kitewell 的 **运行与日志 → 等待中** 处理。[提醒](/zh/docs/alerts/)可以告诉他们有运行在等待输入。
- 由对方系统通过 REST 处理，需要 **运行工作流** 权限：审批用 `POST /api/runs/{jobId}/{id}/approvals/{stepId}/approve`、`/reject` 或 `/push-back`，人工任务用 `POST /api/runs/{jobId}/{id}/human-tasks/{stepId}/complete`。

拥有自己任务列表的平台，可以在那里向用户展示审批，再把他们的答复传给 Kitewell。
