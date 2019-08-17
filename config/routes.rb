Rails.application.routes.draw do
  post '/comments/session', to: 'comments#session_create'
  devise_for :users
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  resources :brands do
    collection do
      get "ranking"
      get "search"
    end
    resources :comments, only: [:index, :create]
  end
    
  root 'brands#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
