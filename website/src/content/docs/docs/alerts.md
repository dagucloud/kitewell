---
title: Alerts
---

Alerts tell you when a workflow needs attention, so you do not have to keep
Kitewell open to find out. They are part of Kitewell Pro. On the free plan,
**Notifications** offers the upgrade instead.

## Add channels

Open **Notifications** under **This device**. A channel is somewhere alerts go:

- **This device** shows desktop notifications on macOS. Turn on **Notify on
  this device** and allow notifications when macOS asks.
- **Email** sends to a list of recipients through the **Email server** set up
  on the same page. The server must support TLS or STARTTLS; use an app
  password if your provider requires one.
- **Slack** posts to a channel through an incoming webhook.
- **Microsoft Teams** posts through a workflow created from the template that
  posts to a channel when a webhook request is received.
- **PagerDuty** opens an incident through an Events API v2 integration key,
  and resolves it when the problem ends.
- **Webhook** posts signed JSON to any receiver, in the
  [Standard Webhooks](https://www.standardwebhooks.com/) format. The signing
  secret is shown once, when the channel is created.

**Send test** delivers a sample alert with the values you typed, before you
save them. Each channel shows whether its last delivery arrived, and
**Recent alerts** lists what was sent and what is still being retried.

## Choose what you hear about

Rules decide which events reach which channels:

1. **Default alert rules** on the **Notifications** page apply to every
   project without rules of its own.
2. **Project settings → Notifications** gives one project its own rules.
3. The bell on a workflow, in its editor or the **Jobs** list, mutes it for an
   hour, a day, a week, or until unmuted, gives it rules of its own, or sets
   when its runs count as long. These changes apply at once and do not change
   the workflow's definition.

## Events

- **Fails**: after the last automatic retry. You hear when a failure streak
  begins, not on every failed run, and again with **Recovered** when the next
  run succeeds.
- **Needs input**: a human task or approval is waiting for someone.
- **Misses a schedule**: scheduled runs did not start, with how many and why,
  such as the computer being asleep or Kitewell not running. **Schedule
  resumed** follows when it runs on time again.
- **Runs long**: a run is still going well past the time its recent successes
  took, or past a limit you set for the workflow.
- **Is cancelled** and **Succeeds**: off unless you route them.

PagerDuty receives only failures, missed schedules, and long runs, since those
are the alerts that later end.

## What an alert contains

Alerts name the project, workflow, and failed step, with an exit code or time
limit when that was the cause. They leave out step output and run parameters.
Links open the run in Kitewell on the computer running it.

Alerts are sent by the background service while the computer is awake. An
alert that cannot be delivered is retried for up to a day. Kitewell does not
monitor your computer from outside: if it is asleep or off, nothing is sent
until it wakes, and missed schedules are reported then.

## Alerts and event handlers

[Event handlers](/docs/workflow-builder/#run-a-task-when-the-workflow-ends)
are tasks that run when a workflow succeeds, fails, is cancelled, or ends, for
cleanup or recovery. Use alerts, not handlers, to tell people. Workflow
definitions cannot set the engine's own email settings (`mail_on`, `smtp`,
`error_mail`, `info_mail`, or `mail_on_error`); alerts are configured in
Kitewell.
