// Quick actions for the dashboard. Loaded before the page script; exposes window.DashboardActions.
//
// v1: clipboard only. Each entry builds a shell command for the viewer to paste into a terminal
// that has the GitHub CLI installed and logged in. ctx = { pr, card, data }.
window.DashboardActions = {
  copy: [
    { id: 'ready',    label: 'ready',    cmd: ctx => `gh pr ready ${ctx.pr.number} -R ${ctx.data.code_repo}` },
    { id: 'approve',  label: 'approve',  cmd: ctx => `gh pr review ${ctx.pr.number} --approve -R ${ctx.data.code_repo}` },
    { id: 'web',      label: 'web',      cmd: ctx => `gh pr view ${ctx.pr.number} --web -R ${ctx.data.code_repo}` },
    { id: 'checkout', label: 'checkout', cmd: ctx => `gh pr checkout ${ctx.pr.number} -R ${ctx.data.code_repo}` },
  ],

  // ---------------------------------------------------------------------------------------------
  // v2 HOOKS. NOT IMPLEMENTED YET. Nothing here writes anywhere.
  //
  // Each entry becomes one button next to a PR (appliesTo: 'pr') or a Jira card (appliesTo: 'card').
  // The page calls run(ctx) on click, after showing `confirm` when it is set. ctx = { pr, card, data,
  // token, github }, where github(method, path, body) is a fetch against api.github.com authenticated with
  // the viewer's stored code-repo token, and token is that token (writes target the code repo).
  //
  //   { id: 'mark-ready', label: 'mark ready', appliesTo: 'pr', confirm: 'Mark #{n} ready for review?',
  //     run: async ctx => ctx.github('PATCH', `/repos/${ctx.data.code_repo}/pulls/${ctx.pr.number}`, { draft: false }) }
  //
  // Planned entries:
  //   mark-ready   PATCH /repos/{repo}/pulls/{n} { draft: false }   (or GraphQL markPullRequestReadyForReview)
  //   approve      POST  /repos/{repo}/pulls/{n}/reviews { event: 'APPROVE' }
  //   comment      POST  /repos/{repo}/issues/{n}/comments { body }
  //   jira-move    open {data.jira_base}/browse/{card.key} (transition via the issue page; no Jira API token)
  // ---------------------------------------------------------------------------------------------
  v2: [],
};
