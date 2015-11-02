FactoryGirl.define do
    colors = ["White", "Black", "Red", "Blue", "Green", "None"]
    prng = Random.new

    sequence :name do |n|
        "testcard#{n}"
    end

    sequence :attack do
        prng.rand(0..99)
    end

    sequence :defense do
        prng.rand(0..99)
    end

    sequence :mana_red do
        prng.rand(0..99)
    end

    factory :card do
        trait :with_name do
            name
        end

        trait :without_name do
            name nil
        end

        trait :with_name_too_long do
            name { generate(:name) + "a"*64 }
        end

        trait :with_color do
            color colors.sample
        end

        trait :with_invalid_color do
            color "Purple"
        end

        trait :with_attack do
            attack
        end

        trait :with_defense do
            defense
        end

        trait :with_desc do
            desc "a" * 128
        end

        trait :without_desc do
            desc nil
        end

        trait :with_mana_red do
            mana_red 
        end
    end
end