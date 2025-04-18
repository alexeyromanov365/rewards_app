require 'rails_helper'

RSpec.describe RedemptionService, type: :service do
  let(:user) { create(:user, points: 1000) }
  let(:reward) { create(:reward, points_cost: 500, available: true) }

  let(:service) { described_class.new(user, reward) }

  describe '#create_redemption' do
    context 'when user has sufficient points and reward is available' do
      it 'creates a redemption' do
        expect { service.create_redemption }.to change(Redemption, :count).by(1)
      end

      it 'deducts points from user' do
        expect { service.create_redemption }.to change { user.reload.points }.by(-reward.points_cost)
      end

      it 'returns the redemption' do
        redemption = service.create_redemption

        expect(redemption).to be_a(Redemption)
        expect(redemption.user).to eq(user)
        expect(redemption.reward).to eq(reward)
      end
    end

    context 'when user has insufficient points' do
      before { user.update(points: 100) }

      it 'raises ValidationError' do
        expect { service.create_redemption }.to raise_error(RedemptionValidator::ValidationError, 'Insufficient points')
      end

      it 'does not create redemption' do
        expect do
          begin
            service.create_redemption
          rescue RedemptionValidator::ValidationError
          end
        end.not_to change(Redemption, :count)
      end

      it 'does not deduct points' do
        expect do
          begin
            service.create_redemption
          rescue RedemptionValidator::ValidationError
          end
        end.not_to change { user.reload.points }
      end
    end

    context 'when reward is not available' do
      before { reward.update(available: false) }

      it 'raises ValidationError' do
        expect {
          service.create_redemption
        }.to raise_error(RedemptionValidator::ValidationError, 'Reward is not available')
      end

      it 'does not create redemption' do
        expect do
          begin
            service.create_redemption
          rescue RedemptionValidator::ValidationError
          end
        end.not_to change(Redemption, :count)
      end

      it 'does not deduct points' do
        expect do
          begin
            service.create_redemption
          rescue RedemptionValidator::ValidationError
          end
        end.not_to change { user.reload.points }
      end
    end
  end
end
