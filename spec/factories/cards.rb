FactoryGirl.define do
    colors = ["White", "Black", "Red", "Blue", "Green", "None"]

    sequence :name do |n|
        "testcard#{n}"
    end

    factory :card do
        name
        attack 3
        defense 5
        mana_none 4
        color "None"
        desc nil

        trait :with_name_too_long do
            name { generate(:name) + "a"*64 }
        end

        trait :name_with_space do
            name { generate(:name).insert(1, " ")}
        end

        trait :name_invalid do
            name { generate(:name).insert(1, "$")}
        end
    end
end