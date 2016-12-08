# Server configuration. For a simple site this is just one entry.
role :app, %w{deployment@lol-production.vm.errorstudio.com}
role :web, %w{deployment@lol-production.vm.errorstudio.com}
role :db, %w{deployment@lol-production.vm.errorstudio.com}

set :primary_domain, "alpha.layersoflondon.org"

# Git branch
set :branch, 'master'

#the base domain for this site - is appended to the primary domain for a prelaunch url
set :base_domain, "prelaunch.error.agency"

# the prelaunch domain
set :prelaunch_domain, ->{"#{fetch(:primary_domain)}.#{fetch(:base_domain)}"}

#domains which this site will answer to (i.e. not redirect)
set :site_domains, [fetch(:primary_domain)]
#redirects domains to the primary domain as a 301
set :domain_redirects, %w(www.layersoflondon.org)

#rewrites in nginx format - useful for specifying hard-coded urls for redirection after launch
set :url_rewrites, {}

# set the deploy domain to the prelaunch domain
set :deploy_domain, fetch(:prelaunch_domain)

set :passenger_port, 8001
set :upstream_proxy_cache, false

#http basic auth
# secrets = YAML.load_file(File.expand_path("../../secrets.yml", __FILE__))['development']
# set :basic_auth_required, !secrets['http_username'].nil? && !secrets['http_password'].nil?
# set :basic_auth_username, secrets["http_username"]
# set :basic_auth_password, secrets["http_password"]
