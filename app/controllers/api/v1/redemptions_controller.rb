class Api::V1::RedemptionsController < ApplicationController
  def create
    user = User.find(params[:user_id])
    reward = Reward.find(params[:reward_id])
    
    if !reward.available
      render json: { error: 'Reward not available' }, status: :unprocessable_entity
      return
    end
    
    if user.points < reward.points_cost
      render json: { error: 'Insufficient points' }, status: :unprocessable_entity
      return
    end
    
    redemption = Redemption.new(user: user, reward: reward)
    
    if redemption.save
      render json: redemption, status: :created
    else
      render json: { errors: redemption.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound => e
    render json: { error: e.message }, status: :not_found
  end
  
  def history
    user = User.find(params[:user_id])
    redemptions = user.redemptions.includes(:reward).order(redeemed_at: :desc)
    
    render json: redemptions.as_json(include: { reward: { only: [:name, :description, :points_cost] } })
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end
end
