---
title: 卸载 Kitewell
---

移除 Kitewell 应用和删除你的工作成果是两件不同的事。按照本页操作会移除应用，但项目、运行记录和备份都会原样保留，以后重新安装时还能继续使用。如果你想连数据一起删除，请看最后一节。

## 开始之前

保存你的工作，并等待正在运行的工作流完成。卸载不会等待它们。如果想立即结束它们，请在 Mac 的菜单栏或 Windows 的托盘菜单中选择 **退出 Kitewell**。这会同时停止所有项目引擎。

## 在 Mac 上

1. 在菜单栏菜单中关闭 **登录时打开**，这样下次登录时就不会再尝试打开 Kitewell。如果 Kitewell 已经删除，请改为在 **系统设置 → 通用 → 登录项** 中移除它。这里的名称因 macOS 版本而异。
2. 在菜单栏或屏幕顶部的 Kitewell 菜单中选择 **退出 Kitewell**。⌘Q 对应的是 **在菜单栏中继续运行**，只会隐藏窗口。
3. 把 **Kitewell.app** 从“应用程序”文件夹拖到废纸篓。

### 如果残留了后台注册项

Kitewell 通过 macOS 的 launch agent 运行其后台服务，并在你退出时将其卸载。如果仍有一份处于加载状态，或者旧版本在 `~/Library/LaunchAgents` 中留下了一份，请以运行 Kitewell 的同一个 macOS 用户身份，在“终端”中运行以下命令将其删除：

```sh
launchctl bootout "gui/$(id -u)/xyz.kitewell.agent" 2>/dev/null || true
rm -f "$HOME/Library/LaunchAgents/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/native-token"
```

这些命令会删除注册项，以及应用用来连接自身服务的令牌。它们不会触及你的工作流或备份。

## 在 Windows 上

1. 打开 **设置 → 应用 → 已安装的应用**，找到 **Kitewell**，然后选择 **卸载**。
2. 卸载程序会结束正在运行的 Kitewell 及其后台服务，并从你的用户账户中移除该应用。如果开启了 **无人登录时也运行**，它还会在一次管理员确认后，移除 Kitewell 登录服务（Kitewell sign-in）及其位于 `C:\Program Files\Kitewell` 下的程序。你的数据会保留。
3. 如果之后 Kitewell 仍出现在 **设置 → 应用 → 启动** 中，请在那里将其关闭。

## 你的数据

留下的内容都在一个文件夹中：

- 在 Mac 上：`~/Library/Application Support/Kitewell`
- 在 Windows 上：`%LOCALAPPDATA%\Kitewell`；如果曾经开启过 **无人登录时也运行**，数据会被移到 `C:\ProgramData\Kitewell`。

其中包括你的项目、它们的运行历史和密钥、你的备份，以及日志。如果你以后可能重新安装，请保留它。

如果要彻底删除，请先把仍需要的备份和文件复制出来，然后在访达或文件资源管理器中删除该文件夹。此操作无法撤销。

如果这台设备曾与 [Dagu Cloud](/zh/docs/cloud-sync/) 同步项目，这些项目会保留在 Dagu Cloud 中。在你连接另一台电脑将其替换之前，这台设备仍计入工作区套餐可容纳的电脑数量。如需释放名额，请在 Dagu Cloud 的 **Kitewell** 页面上断开它的连接。
