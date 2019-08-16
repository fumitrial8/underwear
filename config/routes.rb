Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root 'brands#home'
  # devise_for :users
  resources :brands do
    collection do
      get "ranking"
      get "search"
    end
    resources :comments, only: [:index, :create]
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
