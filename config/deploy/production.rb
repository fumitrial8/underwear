server '3.114.195.195', user: 'ec2-user', roles: %w{app db web}

set :whenever_roles, :batch
set :whenever_environment, :production