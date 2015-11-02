require 'rails_helper'

RSpec.describe Users::RegistrationsController, type: :controller do
	before :each do
		timestamp = Time.now.to_i
		@username = "signup#{timestamp}"
		@email = "#{timestamp}@miao.com"
		@password = "null123!"
		@password_confirmation = @password
	end

	describe "Creating user should succeed" do
		it "creates user" do
			user = User.new(username:@username, email:@email, password:@password, password_confirmation:@password_confirmation)
			expect(user.save).to eq(true)
		end
	end

	describe "Creating user should fail" do
		context "Username" do
			it "exists" do
				user = User.new(username:@username, email:@email, password:@password, password_confirmation:@password_confirmation)
				expect(user.save).to eq(true)

				timestamp = Time.now.to_i
				email = "#{timestamp}@miao.com"
				user = User.new(username:@username, email:email, password:@password, password_confirmation:@password_confirmation)
				expect(user.save).to eq(false)
			end

			it "is too long" do
				username = @username + "a"*64
				user = User.new(username:username, email:@email, password:@password, password_confirmation:@password_confirmation)
				expect(user.save).to eq(false)
			end
		end

		context "Email" do
			it "exists" do
				user = User.new(username:@username, email:@email, password:@password, password_confirmation:@password_confirmation)
				expect(user.save).to eq(true)

				timestamp = Time.now.to_i
				username = "signup#{timestamp}"
				user = User.new(username:username, email:@email, password:@password, password_confirmation:@password_confirmation)
				expect(user.save).to eq(false)
			end

			it "is not valid" do
				timestamp = Time.now.to_i
				email = "#{timestamp}"
				user = User.new(username:@username, email:email, password:@password, password_confirmation:@password_confirmation)
				expect(user.save).to eq(false)
			end
		end

		context "Password" do
			it "Password is too short" do
				password = "a"*7
				user = User.new(username:@username, email:@email, password:password, password_confirmation:password)
				expect(user.save).to eq(false)
			end

			it "Password is too long" do
				password = "a"*65
				user = User.new(username:@username, email:@email, password:password, password_confirmation:password)
				expect(user.save).to eq(false)
			end

			it "Password confirmation does not match password" do
				user = User.new(username:@username, email:@email, password:@password, password_confirmation:@password_confirmation + "a")
				expect(user.save).to eq(false)
			end
		end
	end
end
