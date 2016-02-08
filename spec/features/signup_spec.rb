require 'rails_helper'
require 'spec_helper'

describe 'sign up', type: :feature, js:true do
	it 'signs me up' do
		visit '/'
		page.find('#sign_up').click
		within 'form#new_user' do
			fill_in 'Username', with: "testSignUp_#{Time.now.to_i}"
			fill_in 'Email', with: "biu#{Time.now.to_i}@biu.com"
			fill_in 'Password', with: 'null123!'
			fill_in 'Confirm password', with: 'null123!'
		end
		page.execute_script "document.getElementsByClassName('lightbox-active')[0].scrollTop = 10000;"
		page.find('#sign-up-btn').click
		expect(page).to have_content 'Log out'
		expect(page).to have_content 'Create A Magic Card'
	end
end