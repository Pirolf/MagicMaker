require 'spec_helper'
include Warden::Test::Helpers

describe 'types', type: :feature do
    before(:each) do
        #create a card
        @user_with_card = FactoryGirl.create(:user_with_card)
        login_as @user_with_card, scope: :user
    end

    it 'creates new type' do
        visit 'types/3/edit'
        within('form.edit_subtype:first-child') do
            fill_in 'subtype[name]', with: "type_#{Time.now.to_i}"
            click_button 'Update'
        end
        expect(page).to have_selector('div.success-msg')
    end
end