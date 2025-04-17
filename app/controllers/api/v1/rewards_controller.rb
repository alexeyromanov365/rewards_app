class Api::V1::RewardsController < ApplicationController
  def index
    rewards = Reward.where(available: true)
    render json: rewards
  end
  
  def show
    reward = Reward.find(params[:id])
    render json: reward
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Reward not found' }, status: :not_found
  end
end
