Rails.application.routes.draw do
  root 'brands#index'
  devise_for :users
  resources :brands

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
