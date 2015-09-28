require 'rails_helper'
include ActionDispatch::TestProcess
RSpec.describe CardsController, type: :controller do
	before :each do 
		#the basic success case has only required fields filled
		@basic_card = Card.new({name: 'nyo', color: 'White'})
	end

	describe 'Creating a card should succeed when' do
		it 'card is default setup' do 
			expect(@basic_card.save).to eq(true)
		end
		it 'name is not too long (<=64)' do 
			@basic_card.name = 'abcd'
			expect(@basic_card.save).to eq(true)
		end
		it 'color is among red green blue black white' do
			@basic_card.color = "Green"
			expect(@basic_card.save).to eq(true)
		end
		it 'attack is an int between [0,99]' do 
			@basic_card.attack = 20
			expect(@basic_card.save).to eq(true)
		end
		it 'defense is an int between [0,99]' do
			@basic_card.defense = 20
			expect(@basic_card.save).to eq(true)
		end
		it 'desc is blank' do 
			@basic_card.desc = nil
			expect(@basic_card.save).to eq(true)
		end
		it 'desc is not too long' do 
			@basic_card.desc = 'a' * 512
			expect(@basic_card.save).to eq(true)
		end
		it 'mana cost is an int in [0,99]' do 
			@basic_card.mana_red = 15
			expect(@basic_card.save).to eq(true)
		end
		#test paperclip upload images
		it 'image has valid image type and is less than 2mb' do 
			image = fixture_file_upload('blue-marble.png', 'image/png')
			@basic_card.image_art = image
			expect(@basic_card.save).to eq(true)
		end
	end

	describe 'Creating a card should fail when' do
		it 'name does not exist' do
			@basic_card.name = nil
			expect(@basic_card.save).to eq(false)
			expect(@basic_card.errors[:name]).not_to be_nil
		end
		it 'name is too long' do
			@basic_card.name = 'a' * 65
			expect(@basic_card.save).to eq(false)
			expect(@basic_card.errors[:name]).not_to be_nil
		end
		it 'color is not among red green blue black white' do
			@basic_card.color = 'Purple'
			expect(@basic_card.save).to eq(false)
			expect(@basic_card.errors[:color]).not_to be_nil
		end
		it 'attack is not in [0,99]' do 
			@basic_card.attack = 100
			expect(@basic_card.save).to eq(false)
			expect(@basic_card.errors[:attack]).not_to be_nil
		end
		it 'attack is not an int' do 
			@basic_card.attack = 1.5
			expect(@basic_card.save).to eq(false)
			expect(@basic_card.errors[:attack]).not_to be_nil
		end

		it 'defense is not in [0, 99]' do 
			@basic_card.defense = -1
			expect(@basic_card.save).to eq(false)
			expect(@basic_card.errors[:defense]).not_to be_nil
		end
		it 'defense is not int' do 
			@basic_card.defense = 2.5
			expect(@basic_card.save).to eq(false)
			expect(@basic_card.errors[:defense]).not_to be_nil
		end

		it 'desc is too long' do 
			@basic_card.desc = 'a' * 1025
			expect(@basic_card.save).to eq(false)
			expect(@basic_card.errors[:desc]).not_to be_nil
		end
		it 'mana_cost is not an int' do 
			@basic_card.mana_green = 1.5
			expect(@basic_card.save).to eq(false)
			expect(@basic_card.errors[:mana_green]).not_to be_nil
		end
		it 'mana_cost is not in [0,99]' do 
			@basic_card.mana_green = 100
			expect(@basic_card.save).to eq(false)
			expect(@basic_card.errors[:mana_green]).not_to be_nil
		end
		it 'image is over 2mb' do 
			image = fixture_file_upload('oversized_terrain.jpg', 'image/jpeg')
			@basic_card.image_art = image
			expect(@basic_card.save).to eq(false)
			expect(@basic_card.errors[:image_art]).not_to be_nil
		end
		it 'file is not an image' do
			file = fixture_file_upload('test.txt', 'text/plain')
			@basic_card.image_art = file
			expect(@basic_card.save).to eq(false)
			expect(@basic_card.errors[:image_art]).not_to be_nil
		end
	end
end
