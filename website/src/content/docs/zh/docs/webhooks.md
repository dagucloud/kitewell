---
title: 通过 Webhook 启动工作流
---

工作流可以在其他服务向它发送请求时启动：GitHub 在有 issue 被创建时，Stripe 在付款成功时，表单在有人提交时，或者 Zapier 和 Make 代它们连接的应用发出请求。你的电脑没有公网地址，所以请求会先发到 Kitewell 的中继，再由中继转交给你电脑上的 Kitewell。无需开放端口，也无需设置隧道。

Webhook 功能包含在 Kitewell Personal 和 Team 中，并且需要 Kitewell 已[登录](/zh/docs/cloud-sync/#sign-in) Dagu Cloud。

## 开启 Webhook

1. 打开一个已保存的工作流，选择 **计划**，或选择 **运行时机** 卡片。
2. 在 **Webhook** 下选择 **开启**。片刻之后会出现 URL：`https://hooks.kitewell.app/…`。
3. 选择 **复制**，然后把 URL 粘贴到发送请求的服务中。
4. 选择 **发送测试请求**，把完整流程试一遍：Kitewell 会向自己的 URL 发送一个请求，这个请求会像其他请求一样经由中继返回。它会像真实请求一样启动一次运行，并在 **最近的请求** 下打开，显示收到的内容。

之后，**运行时机** 卡片会显示 **Webhook 已开启**。只有能编辑该工作流的人才能看到它的 URL。API 密钥和已连接的应用无法读取它。

## 让助手使用请求

你不需要了解请求的结构就能使用它：

1. 让真实的服务发送一个请求，例如在 GitHub 上创建一个测试 issue。
2. 在 **最近的请求** 下，选择该请求旁边的 **详情**，查看它携带的内容。
3. 选择 **根据此请求构建步骤**。助手会以这个请求为依据打开。把你的需求补全成一句话，例如“取出 issue 的标题和创建者，然后发到 Slack”，再发送。

助手会自己读取请求并提出步骤，在你应用之前不会保存任何内容。

## 在步骤中读取请求

每个请求启动一次运行，运行历史中的触发方式显示为 **Webhook**。步骤从两个环境变量中读取请求：

- `WEBHOOK_PAYLOAD` 保存原样发来的正文。
- `WEBHOOK_HEADERS` 以 JSON 形式保存请求头：名称为小写，每个名称对应一个值列表，例如 `{"x-github-event":["issues"]}`。`Authorization` 和 Cookie 不包含在内。

这两个变量都不需要声明为输入。若要从 JSON 正文中取出某个字段（例如 issue 的标题），可以用 **根据此请求构建步骤** 请助手帮忙：它会添加一个取出该字段的步骤，后面的步骤再按名称读取，例如 `${steps.issue.outputs.title}`。AI 步骤可以把整个正文作为文本放进提示词中。

正文是发送方发来的任意内容，因此应视为不可信。命令应从环境变量中读取它：在 macOS 的 shell 中写作 `"$WEBHOOK_PAYLOAD"`，在 Windows 的 PowerShell 中写作 `$env:WEBHOOK_PAYLOAD`。切勿把 `${env.WEBHOOK_PAYLOAD}` 或从中取出的值写进命令文本，否则其中的引号会变成代码。[助手](/zh/docs/ai/#the-assistant)了解这些变量：请它根据你预期收到的请求来构建工作流。

## 设置发送方

### GitHub

1. 在仓库或组织中，打开 **Settings → Webhooks**，选择 **Add webhook**。
2. 将 URL 粘贴到 **Payload URL**。
3. 将 **Content type** 设为 `application/json`。GitHub 默认以表单数据（`payload=…`）发送正文，那不是 JSON。
4. 在 **Which events would you like to trigger this webhook?** 下，选择 **Let me select individual events**，只勾选工作流需要的事件。GitHub 发送的每个事件都会启动一次运行，除非被[仅限以下事件](#take-only-some-events)排除在外。
5. 若要让 Kitewell 校验 GitHub 的签名，请将 Kitewell 生成的密钥粘贴到 **Secret**。请参阅[确认请求的发送方](#check-who-sent-the-request)。

GitHub 的 **Recent Deliveries** 标签页会显示每个请求以及 Kitewell 的响应，中继接收后为 `202`。

### 其他服务

任何能发送 HTTP `POST` 的服务都可以使用。在 Stripe 中，用该 URL 添加一个事件目标（event destination）并选择事件。在 Slack 应用中，将 URL 粘贴到 Event Subscriptions 下。在 Zapier 或 Make 中，添加一个向该 URL 发送 POST 的 Webhook 操作。表单服务通常有 Webhook 或“通知某个 URL”之类的设置。

<a id="check-who-sent-the-request"></a>

## 确认请求的发送方

任何拥有该 URL 的人都可以向它发送请求。若只想为真正的发送方签名过的请求启动运行，请在 **接受来自以下来源的请求** 下选择该发送方：GitHub、Stripe、Slack 或 Standard Webhooks。选择 **任何拥有此 URL 的人** 会重新关闭校验。

- GitHub：选择 **创建密钥**。Kitewell 只显示一次密钥；请将它粘贴到 GitHub Webhook 的 **Secret** 中。**新密钥** 会替换它，在你把新密钥粘贴到那里之前，GitHub 的请求都会被拒绝。
- Stripe：将事件目标的签名密钥（以 `whsec_` 开头）粘贴到 **签名密钥**，然后选择 **保存**。
- Slack：将 Slack 应用 Basic Information 中的 Signing Secret 粘贴到 **签名密钥**，然后选择 **保存**。即使这台电脑不在线，Kitewell 的中继也会响应 Slack 的 URL 验证。
- Standard Webhooks：将发送方显示的签名密钥（以 `whsec_` 开头）粘贴到 **签名密钥**，然后选择 **保存**。

没有有效签名的请求不会启动运行，并显示 **已拒绝** 及原因。Stripe、Slack 或 Standard Webhooks 的签名必须在中继收到请求的时间前后五分钟以内生成，因此在中继处等待过的请求仍能通过校验。**发送测试请求** 发出的请求同样带有签名。

<a id="take-only-some-events"></a>

## 只接收部分事件

**仅限以下事件** 中列出其请求会启动运行的事件，用逗号分隔，例如 `issues.opened, invoice.paid`。一个名称也包括它下面的事件：`issues` 包括 `issues.opened` 以及其他所有 `issues` 事件。**最近收到：** 会列出最近请求中出现的事件，点一下即可添加。选择 **保存**；留空时，每个事件都会启动运行。

Kitewell 按发送方自己的方式为事件命名：GitHub 是事件名和 action 用点连接；Stripe 和 Standard Webhooks 的发送方是正文中的 `type`；Slack 是其回调所携带事件的类型。

关于其他事件的请求，或者没有指明事件的请求，不会启动运行，并显示 **已跳过**。GitHub 只用来检查 URL 的 ping 也是如此。

## 电脑处于睡眠或离线状态时

无论你的电脑能否连通，中继都会立即响应发送方。请求会在中继处最多等待 7 天，Kitewell 重新连接后按从旧到新的顺序运行。一台电脑最多可以有 1,000 个请求在等待；超过后，中继会要求发送方稍后重试。

## 最近的请求

Webhook 部分会列出最近的 20 个请求：每个请求的到达时间、发送方给出的事件名称（例如 GitHub 的 `issues.opened` 或 Stripe 的 `payment_intent.succeeded`）、大小和结果。列表打开期间会自动更新。

**详情** 会打开一个请求：以易于阅读的格式显示其正文和请求头，每项都附有 **复制**，另有 **根据此请求构建步骤** 和 **查看运行 →**。没有启动运行的请求会改为显示原因，因为正文只会随运行一起保存。

| 结果 | 含义 |
| --- | --- |
| **已启动运行** | 该请求启动了一次运行。中继发送了两次的同一请求只会启动一次运行。 |
| **失败** | 无法将运行加入队列，例如项目的引擎已停止。如果引擎繁忙或正在恢复，Kitewell 会先重试 10 分钟。 |
| **已忽略** | 付费套餐已结束，或该工作流不在你的套餐范围内。 |
| **已拒绝** | 该请求没有 **接受来自以下来源的请求** 中所选发送方的有效签名。 |
| **已跳过** | 该请求涉及的事件不在该 Webhook 的接收范围内，或者它是 GitHub 的 ping。 |

## 保护好 URL

除非 Webhook 会[确认请求的发送方](#check-who-sent-the-request)，否则任何拥有该 URL 的人都能启动这个工作流。请像对待密码一样对待它。

- **新 URL** 会立即替换它，旧 URL 会返回 `404`。请在所有用过旧 URL 的地方粘贴新的 URL。
- **关闭** 也会以同样的方式停用 URL。重新开启 Webhook 会生成新的 URL。

Webhook URL 属于一台电脑。在同事的电脑上开启同一个工作流的 Webhook，那台电脑会得到自己的 URL。从备份恢复后，Webhook 处于关闭状态。

## 限制

| 限制 | 值 |
| --- | --- |
| 请求正文 | 512 KiB 文本 |
| 每个 URL 的请求数 | 每分钟 60 个 |
| 等待电脑接收的请求 | 1,000 个，最长 7 天 |

中继的响应：

| 状态 | 含义 |
| --- | --- |
| `202` | 已接收。正文为 `{"id": "…"}`。 |
| `404` | 不是 Webhook URL，或已被关闭或替换。 |
| `413` | 正文超过 512 KiB。 |
| `415` | 正文不是 UTF-8 文本。 |
| `429` | 本分钟内超过 60 个请求；请在 `Retry-After` 指定的秒数之后重试。 |
| `503` | 已有 1,000 个请求在等待这台电脑。 |

在 Windows 上，正文超过约 30,000 个字符时可能无法启动运行，请求会显示 **失败**。GitHub 的 push 和 pull request 事件可能有这么大。相关修复正在进行中。

如果付费套餐结束，或该工作流不再在你的套餐范围内，URL 仍会接收请求，但不会启动任何运行，并显示 **已忽略**。重新订阅时不需要新的 URL。

## 请求的去向

请求会经过 Kitewell 位于 Cloudflare 上的中继 hooks.kitewell.app。中继只保存请求到你的电脑取走为止，最长 7 天，并且对每个 URL 的秘密部分只保存哈希值。在你的电脑上，正文会像其他运行输入一样随运行一起保存，保存时长按你设定的保留期限。请参阅[哪些数据会离开你的电脑](/zh/docs/data-flow/)。

## 故障排除

- **“正在从 Kitewell 的中继获取 URL…”一直不消失。** 确认 Kitewell 已登录 Dagu Cloud 且电脑在线，然后关闭 Webhook 再重新开启。
- **新 URL 返回 `404`。** 等几秒钟，让 Kitewell 把新 URL 告知中继。
- **步骤无法解析来自 GitHub 的正文。** 在 GitHub Webhook 中将 **Content type** 设为 `application/json`。
- **请求显示“失败”。** 该行会给出原因。如果是项目已停止，请从菜单栏菜单或托盘菜单启动项目，然后再次发送请求。
