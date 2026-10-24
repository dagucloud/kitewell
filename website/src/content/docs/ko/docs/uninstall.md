---
title: Kitewell 제거
---

Kitewell 앱을 제거하는 일과 작업한 내용을 삭제하는 일은 별개입니다. 이 페이지를 따라 하면 앱은 제거되고 프로젝트, 실행, 백업은 그대로 남으므로, 나중에 다시 설치하면 이어서 쓸 수 있습니다. 데이터까지 지우려면 마지막 섹션을 따르세요.

## 시작하기 전에

작업을 저장하고, 실행 중인 워크플로가 끝날 때까지 기다리세요. 제거는 실행이 끝나기를 기다리지 않습니다. 지금 바로 끝내려면 Mac에서는 메뉴 막대에서, Windows에서는 트레이 메뉴에서 **Kitewell 종료**를 선택합니다. 그러면 모든 프로젝트 엔진도 함께 멈춥니다.

## Mac에서

1. 메뉴 막대 메뉴에서 **로그인 시 열기**를 끄세요. 그러면 다음 로그인 때 Kitewell을 열려고 하지 않습니다. Kitewell이 이미 없다면 대신 **시스템 설정 → 일반 → 로그인 항목**에서 제거하세요. 이곳의 표현은 macOS 버전에 따라 다릅니다.
2. 메뉴 막대나 화면 위쪽의 Kitewell 메뉴에서 **Kitewell 종료**를 선택합니다. ⌘Q는 창만 숨기는 **메뉴 막대에서 계속 실행**입니다.
3. 응용 프로그램 폴더의 **Kitewell.app**을 휴지통으로 드래그합니다.

### 백그라운드 등록이 남아 있을 때

Kitewell은 백그라운드 서비스를 macOS 실행 에이전트로 실행하고, 종료할 때 해제합니다. 로드된 채로 남은 등록이나 이전 버전이 `~/Library/LaunchAgents`에 남긴 등록은, Kitewell을 실행했던 macOS 사용자로 터미널에서 다음 줄을 실행하면 제거됩니다.

```sh
launchctl bootout "gui/$(id -u)/xyz.kitewell.agent" 2>/dev/null || true
rm -f "$HOME/Library/LaunchAgents/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/native-token"
```

이 명령은 등록과, 앱이 자기 서비스에 접근할 때 쓰던 토큰을 지웁니다. 워크플로와 백업은 건드리지 않습니다.

## Windows에서

1. **설정 → 앱 → 설치된 앱**을 열고 **Kitewell**을 찾아 **제거**를 선택합니다.
2. 제거 프로그램이 실행 중인 Kitewell과 백그라운드 서비스를 끝내고, 사용자 계정에서 앱을 제거합니다. **로그인하지 않아도 실행**이 켜져 있었다면 관리자 확인 한 번으로 Kitewell sign-in 서비스와 `C:\Program Files\Kitewell`에 있는 그 프로그램도 제거합니다. 데이터는 남습니다.
3. 그 뒤에도 **설정 → 앱 → 시작 프로그램**에 Kitewell이 보이면 그곳에서 끄세요.

## 내 데이터

남는 것은 한 폴더에 있습니다.

- Mac: `~/Library/Application Support/Kitewell`
- Windows: `%LOCALAPPDATA%\Kitewell`. **로그인하지 않아도 실행**을 켠 적이 있다면 데이터가 옮겨진 `C:\ProgramData\Kitewell`입니다.

이 폴더에는 프로젝트, 실행 기록, 시크릿, 백업, 로그가 있습니다. 다시 설치할 수도 있다면 남겨 두세요.

완전히 지우려면 먼저 아직 필요한 백업과 파일을 복사해 두고, Finder나 파일 탐색기에서 그 폴더를 삭제하세요. 되돌릴 수 없습니다.

이 기기가 프로젝트를 [Dagu Cloud](/ko/docs/cloud-sync/)와 동기화했다면 프로젝트는 그곳에 남습니다. 이 기기는 대신할 다른 컴퓨터를 연결할 때까지 워크스페이스 요금제가 허용하는 컴퓨터 수에 계속 포함됩니다. 자리를 비우려면 Dagu Cloud의 **Kitewell** 페이지에서 연결을 끊으세요.
