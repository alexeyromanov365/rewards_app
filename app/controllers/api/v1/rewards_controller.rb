module Api
  module V1
    class RewardsController < BaseController
      def index
        @rewards = Reward.where(available: true)
      end

      def show
        @reward = Reward.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Reward not found" }, status: :not_found
      end
    end
  end
end
