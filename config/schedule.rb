# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
set :output, "log/crontab.log"
ENV['RAILS_ENV'] ||= 'development'
set :environment, ENV['RAILS_ENV']

if @environment.to_sym == :production
  every 1.day, :roles => [:batch] do
    
    runner "brands_controller.get_twitter_image"
    
  end
end

if @environment.to_sym == :development
  every 1.minutes, :roles => [:batch] do
    
    runner "brands_controller.get_twitter_image"
    
  end
end

# Learn more: http://github.com/javan/whenever
