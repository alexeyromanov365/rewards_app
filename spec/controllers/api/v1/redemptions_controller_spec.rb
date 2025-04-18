require 'rails_helper'

RSpec.describe Api::V1::RedemptionsController, type: :controller do
  let(:user) { create(:user, points: 1000) }
  let(:reward) { create(:reward, points_cost: 500, available: true) }

  describe 'GET #index' do
    let!(:redemption) { create(:redemption, user: user, reward: reward) }

    context 'when user exists' do
      before { get :index, params: { user_id: user.id }, format: :json }

      it 'returns http success' do
        expect(response).to have_http_status(:success)
      end

      it 'returns response in json format' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'returns user redemptions' do
        json_response = JSON.parse(response.body)

        expect(json_response).to be_an(Array)
        expect(json_response.size).to eq(1)
        expect(json_response.first['id']).to eq(redemption.id)
      end
    end

    context 'when user does not exist' do
      before { get :index, params: { user_id: 0 }, format: :json }

      it 'returns http not found' do
        expect(response).to have_http_status(:not_found)
      end

      it 'returns response in json format' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'returns error message' do
        json_response = JSON.parse(response.body)

        expect(json_response).to be_a(Hash)
        expect(json_response['error']).to eq('User not found')
      end
    end
  end

  describe 'POST #create' do
    context 'when user and reward exist' do
      context 'and redemption is successful' do
        before { post :create, params: { user_id: user.id, reward_id: reward.id }, format: :json }

        it 'returns http success' do
          expect(response).to have_http_status(:success)
        end

        it 'returns response in json format' do
          expect(response.content_type).to eq('application/json; charset=utf-8')
        end

        it 'creates a redemption' do
          expect(Redemption.count).to eq(1)
        end

        it 'returns the redemption' do
          json_response = JSON.parse(response.body)

          expect(json_response).to be_a(Hash)
          expect(json_response['id']).to be_present
          expect(json_response['user_id']).to eq(user.id)
          expect(json_response['reward_id']).to eq(reward.id)
        end
      end

      context 'and user has insufficient points' do
        before do
          user.update(points: 100)

          post :create, params: { user_id: user.id, reward_id: reward.id }, format: :json
        end

        it 'returns http unprocessable entity' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns response in json format' do
          expect(response.content_type).to eq('application/json; charset=utf-8')
        end

        it 'returns error message' do
          json_response = JSON.parse(response.body)

          expect(json_response).to be_a(Hash)
          expect(json_response['error']).to eq('Insufficient points')
        end
      end

      context 'and reward is not available' do
        before do
          reward.update(available: false)

          post :create, params: { user_id: user.id, reward_id: reward.id }, format: :json
        end

        it 'returns http unprocessable entity' do
          expect(response).to have_http_status(:unprocessable_entity)
        end

        it 'returns response in json format' do
          expect(response.content_type).to eq('application/json; charset=utf-8')
        end

        it 'returns error message' do
          json_response = JSON.parse(response.body)

          expect(json_response).to be_a(Hash)
          expect(json_response['error']).to eq('Reward is not available')
        end
      end
    end

    context 'when user does not exist' do
      before { post :create, params: { user_id: 0, reward_id: reward.id }, format: :json }

      it 'returns http not found' do
        expect(response).to have_http_status(:not_found)
      end

      it 'returns response in json format' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'returns error message' do
        json_response = JSON.parse(response.body)

        expect(json_response).to be_a(Hash)
        expect(json_response['error']).to eq("Couldn't find User with 'id'=0")
      end
    end

    context 'when reward does not exist' do
      before { post :create, params: { user_id: user.id, reward_id: 0 }, format: :json }

      it 'returns http not found' do
        expect(response).to have_http_status(:not_found)
      end

      it 'returns response in json format' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'returns error message' do
        json_response = JSON.parse(response.body)

        expect(json_response).to be_a(Hash)
        expect(json_response['error']).to eq("Couldn't find Reward with 'id'=0")
      end
    end
  end
end
