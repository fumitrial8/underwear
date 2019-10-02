Rails.application.routes.draw do
  post '/comments/session', to: 'comments#session_create'
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users, only: [:sign_in, :sign_out, :session]
  resources :brands do
    collection do
      get "ranking"
      get "area_ranking"
      get "search"
    end
    resources :comments, only: [:index, :create]
  end
  resources :contacts, only: [:new, :create]
  root 'brands#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
