require 'rails_helper'
RSpec.describe TypesController, type: :controller do
  let(:invalid_attributes) {
    { something: 'abc'}
  }

  describe "GET #index" do
    before(:each) do
      @user = FactoryGirl.create(:user)
      @types = @user.types
    end
    
    describe "authenticated" do
      it "assigns all types as @types" do
        sign_in @user 
        get :index
        expect(assigns(:types)).to eq(@types)
        expect(response).to render_template('types/_index')
      end
    end
    
    describe "unauthenticated" do
      it 'redirects to sign in page' do
        sign_in nil
        get :index
        expect(response).to redirect_to '/users/sign_in'
      end
    end
  end

  describe "GET #show" do
    before(:each) do
      @user = FactoryGirl.create(:user)
      @type = @user.types.first
    end
    
    describe "authenticated" do
      it "assigns the requested type as @type" do
        sign_in @user 
        get :show, {id: @type.to_param}
        expect(assigns(:type)).to eq(@type)
        expect(response).to render_template(:show)
      end
    end

    describe "authenticated as other user" do
      it 'redirects to sign in page' do 
        sign_in FactoryGirl.create(:user)
        get :show, {id: @type.to_param}
        expect(response).to redirect_to '/users/sign_in'
      end
    end
    
    describe "unauthenticated" do
      it 'redirects to sign in page' do
        sign_in nil
        get :show, {id: @type.to_param}
        expect(response).to redirect_to '/users/sign_in'
      end
    end
  end

  describe "GET #new" do
    describe "authenticated" do
      it "assigns a new type as @type" do
        sign_in
        get :new
        expect(assigns(:type)).to be_a_new(Type)
        expect(response).to render_template(:new)
      end
    end

    describe "unauthenticated" do
      it 'assigns a new type as @type' do
        sign_in nil
        get :new
        expect(assigns(:type)).to be_a_new(Type)
        expect(response).to render_template(:new)
      end
    end
  end

  describe "GET #edit" do
    before(:each) do
      @user = FactoryGirl.create(:user)
      @type = @user.types.first
    end
    
    describe "authenticated" do
      it "assigns the requested type as @type" do
        sign_in @user
        get :edit, { id: @type.to_param }
        expect(assigns(:type)).to eq(@type)
        expect(response).to render_template('types/_edit')
      end
    end

    describe "authenticated as other user" do
      it 'redirects to sign in page' do
        sign_in FactoryGirl.create(:user)
        get :edit, { id: @type.to_param }
        expect(response).to redirect_to '/users/sign_in'
      end
    end
    
    describe "unauthenticated" do
      it 'redirects to sign in page' do
        sign_in nil
        get :edit, { id: @type.to_param}
        expect(response).to redirect_to '/users/sign_in'
      end
    end
  end

  describe "GET #subtypes" do
    describe "unauthenticated" do
      before(:each) do
        sign_in nil
        @type = FactoryGirl.create(:type)
      end

      it 'returns subtypes if type is public' do
        allow(@type).to receive(:user).and_return(nil)
        allow(Type).to receive(:find).and_return(@type)

        get :subtypes, { id: @type.to_param, format: :json }
        require('json')
        subtypes = JSON.parse(response.body)
        expect(subtypes.map{|s| s['id']}).to eq(@type.subtypes.map{|s| s[:id]})
      end

      it 'returns 403 if type is not public' do
        get :subtypes, { id: @type.to_param, format: :json }
        expect(response).to have_http_status(:forbidden)
      end
    end

    describe "authenticated" do
      before(:each) do
        @user = FactoryGirl.create(:user)
        @type = @user.types.first
        @subtypes = @type.ordered_subtypes
      end
      
      it 'returns 403 if requesting types of other users' do
        sign_in FactoryGirl.create(:user)
        get :subtypes, { id: @type.to_param, format: :json }
        expect(response).to have_http_status(:forbidden)
      end

      it 'returns 403 if type not found' do
        sign_in FactoryGirl.create(:user)
        get :subtypes, { id: @type[:id] + 1, format: :json }
        expect(response).to have_http_status(:forbidden)
      end

      it 'returns subtypes if the user owns the type' do
        sign_in @user
        get :subtypes, { id: @type.to_param, format: :json }
        require('json')
        subtypes = JSON.parse(response.body)
        expect(subtypes.map {|s| s['id']}).to eq(@subtypes.map{|s| s[:id]})
      end
    end
  end

  describe "POST #create" do
    describe 'unauthenticated' do
      it 'redirects to sign up page' do
        sign_in nil
        type = FactoryGirl.build(:type)
        expect { post :create, type: type.attributes }.to change(Type, :count).by(0)
        expect(response).to redirect_to new_user_session_url
      end
    end

    describe 'authenticated' do
      before(:each) do
        @user = FactoryGirl.create(:user)
        @type = FactoryGirl.build(:type)
        sign_in @user
      end

      describe 'with valid params' do
        it 'creates a new type' do
          expect { post :create, type: @type.attributes, format: :json }.to change(Type, :count).by(1)
        end

        it "assigns a newly created type as @type" do
          post :create, { type: @type.attributes, format: :json }
          expect(assigns(:type)).to be_a(Type)
          expect(assigns(:type)).to be_persisted
        end

        it "responds with newly created type" do
          post :create, { type: @type.attributes, format: :json }
          require 'json'
          type = JSON.parse(response.body)
          expect(response).to have_http_status(:created)
          expect(type['name']).to eq(@type.name)
        end
      end

      describe 'with invalid params' do
        it "assigns a newly created but unsaved type as @type" do
          post :create, { type: invalid_attributes, format: :json }
          expect(assigns(:type)).to be_a_new(Type)
        end

        it "returns errors" do
          post :create, { type: invalid_attributes, format: :json }
          require 'json'
          errors = JSON.parse(response.body)
          expect(errors).to include('errors')
          expect(response).to have_http_status(:ok)
        end
      end
    end
  end

  describe "PUT #update" do
    before(:each) do
      @user = FactoryGirl.create(:user)
      @type = @user.types.first
      @new_attributes = { name: "fur_#{Time.now}"}
    end

    describe 'unauthenticated' do
      it 'redirects to sign up page' do
        sign_in nil
        put :update, { id: @type.to_param, type: @new_attributes, format: :json }
        expect(response).to redirect_to new_user_session_url
      end
    end

    describe 'authenticated as other user' do
      it 'redirects to sign up page' do
        sign_in FactoryGirl.create(:user)
        put :update, { id: @type.to_param, type: @new_attributes, format: :json }
        expect(response).to redirect_to new_user_session_url
      end
    end

    describe 'authenticated' do
      before(:each) do
        sign_in @user
      end

      describe "with valid params" do
        it "updates the requested type" do
          put :update, { id: @type.to_param, type: @new_attributes, format: :json }
          require 'json'
          type = JSON.parse(response.body)
          expect(type['name']).to eq(@new_attributes[:name])
          expect(response).to have_http_status(:ok)
        end

        it "assigns the requested type as @type" do
          put :update, { id: @type.to_param, type: @new_attributes, format: :json }
          expect(assigns(:type)).to eq(@type)
        end
      end

      describe "with invalid params" do
        it "assigns the type as @type" do
          put :update, { id: @type.to_param, type: { name: '' }, format: :json }
          expect(assigns(:type)).to eq(@type)
        end

        it "returns errors" do
          put :update, { id: @type.to_param, type: { name: '' }, format: :json }
          require 'json'
          errors = JSON.parse(response.body)
          expect(errors).to include('errors')
          expect(response).to have_http_status(:ok)
        end
      end
    end
  end

  describe "DELETE #destroy" do
    before(:each) do
      @user = FactoryGirl.create(:user)
      @type = @user.types.first
    end

    describe 'unauthenticated' do
      it 'redirects to sign up page' do
        sign_in nil
        delete :destroy, { id: @type.to_param, format: :json }
        expect(response).to redirect_to new_user_session_url
      end
    end

    describe 'authenticated as other user' do
      it 'redirects to sign up page' do
        sign_in FactoryGirl.create(:user)
        delete :destroy, { id: @type.to_param, format: :json}
        expect(response).to redirect_to new_user_session_url
      end
    end

    describe 'authenticated' do
      it "destroys the requested type" do
        sign_in @user
        expect {
          delete :destroy, { id: @type.to_param, format: :json }
        }.to change(Type, :count).by(-1)

        require 'json'
        deleted_type = JSON.parse(response.body)
        expect(deleted_type['id']).to eq(@type.id)
        expect(response).to have_http_status(:ok)
      end
    end
  end
end