module Api
  module V1
    class RedemptionsController < BaseController
      def index
        user = User.find(params[:user_id])
        @redemptions = user.redemptions.includes(:reward).order(created_at: :desc)
      rescue ActiveRecord::RecordNotFound
        render json: { error: "User not found" }, status: :not_found
      end

      def create
        user = User.find(params[:user_id])
        reward = Reward.find(params[:reward_id])

        if !reward.available
          render json: { error: "Reward not available" }, status: :unprocessable_entity
          return
        end

        if user.points < reward.points_cost
          render json: { error: "Insufficient points" }, status: :unprocessable_entity
          return
        end

        @redemption = Redemption.new(
          user: user,
          reward: reward,
          redeemed_at: Time.current
        )

        if @redemption.save
          user.update(points: user.points - reward.points_cost)

          @redemption
        else
          render json: { errors: @redemption.errors.full_messages }, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e.message }, status: :not_found
      end
    end
  end
end
