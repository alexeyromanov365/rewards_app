Rails.application.routes.draw do
  # API routes
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users, only: [ :show ] do
        resources :redemptions, only: [ :index, :create ]
      end

      resources :rewards, only: [ :index, :show ]
    end
  end

  # Defines the root path route ("/")
  # root "posts#index"
end
