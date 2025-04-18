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

        service = RedemptionService.new(user, reward)
        @redemption = service.create_redemption
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e.message }, status: :not_found
      rescue RedemptionService::ValidationError => e
        render json: { error: e.message }, status: :unprocessable_entity
      end
    end
  end
end
