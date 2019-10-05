# config valid for current version and patch releases of Capistrano
require 'whenever/capistrano'
lock "3.11.1"

set :application, "underwear"
set :repo_url, "https://github.com/fumitrial8/underwear.git"

# バージョンが変わっても共通で参照するディレクトリを指定
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads', 'shared/config')
set :linked_files, fetch(:linked_files, []).push('config/master.key', 'config/database.yml')

set :rbenv_type, :user
set :rbenv_ruby, '2.6.3' #カリキュラム通りに進めた場合、2.5.1か2.3.1です

set :whenever_identifier, ->{ "#{fetch(:application)}_#{fetch(:stage)}" }

# どの公開鍵を利用してデプロイするか
set :ssh_options, auth_methods: ['publickey'],
                  keys: ['~/.ssh/underwear.pem']

# プロセス番号を記載したファイルの場所
set :unicorn_pid, -> { "#{shared_path}/tmp/pids/unicorn.pid" }

# Unicornの設定ファイルの場所
set :unicorn_config_path, -> { "#{current_path}/config/unicorn.rb" }
set :keep_releases, 5

# before_exec do |server|
#   ENV['BUNDLE_GEMFILE'] = File.join(File.expand_path("../../../../", __FILE__), "current", "Gemfile")
# end
# デプロイ処理が終わった後、Unicornを再起動するための記述
after 'deploy:publishing', 'deploy:restart'
before 'deploy:starting', 'deploy:upload'


namespace :deploy do
  task :upload do
    on roles(:app) do |host|
      if test "[ ! -d #{shared_path}/config ]"
        execute "mkdir -p #{shared_path}/config"
      end
      upload!('config/database.yml', "#{shared_path}/config/database.yml")
      upload!('config/master.key', "#{shared_path}/config/master.key")
    end
  end
  task :restart do
    invoke 'unicorn:restart'
  end
end
