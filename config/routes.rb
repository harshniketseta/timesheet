Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  devise_for :users, controllers: { omniauth_callbacks: "omniauth_callbacks" }

  resources :home, only: [:index]
  resources :dashboard, only: [:index]
  resources :projects do
    resources :tasks
    member do
      post :restore
    end
  end
  resources :project_users, only: [:create]
  post "lists/:type" => "lists#show"

  resource :timeline do
    member do
      get :tasks
    end
  end
  root to: "home#index"
end
