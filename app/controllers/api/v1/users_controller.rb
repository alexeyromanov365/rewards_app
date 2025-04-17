class Api::V1::UsersController < ApplicationController
  # For simplicity, we'll use a mock current_user, in a real app would use authentication
  def points_balance
    user = User.find(params[:id])
    render json: { points: user.points }
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end
end
