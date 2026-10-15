# Isolated staging bootstrap gateway — CP276

This is an intentionally public, tiny, **fail-closed** HTTP bootstrap used to
verify Render HTTPS/Node hosting only. No private Forge/Jira/tenant source code,
application identifiers, bearer credentials, secrets or provider evidence.

GET /healthz = 200 (alive=true, ready=false, productionGo=false).
All other routes, including GET /readyz and POST /forge = 503.
**This is NOT a Forge Remote, a fully deployed Jira application, or production GO.**

Private CP275 verifier code and exact source-derived 128 mandatory/9 observational
cases remain in a separate private repository branch. Never copy it here. Do not
add env vars or secrets. Promoting this bootstrap to production is forbidden.
