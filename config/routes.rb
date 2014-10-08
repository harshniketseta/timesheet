Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  devise_for :users, controllers: { omniauth_callbacks: "omniauth_callbacks" }

  resources :home, :only => [:index]
  resources :dashboard, :only => [:index]
  resources :projects

  root to: "home#index"
end
