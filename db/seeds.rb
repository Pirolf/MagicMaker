# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
colors = ['Red', 'Green', 'Blue', 'Black', 'White', 'None']
colors.each do |c|
    if Color.find_by(color_name: c).nil?
        Color.create color_name: c
    end
end

types = {
    'Artifact': ['Equipment', 'Fortification'],
    'Artifact Creature': [],
    'Creature': ['Advisor', 'Cleric', 'Elemental', 'Illusion', 'Soldier', 'Wall'],
    'Enchantment': [],
    'Enchantment Creature': [],
    'Instant': ['Arcane', 'Trap'],
    'Land': [],
    'Basic Land': [],
    'Sorcery': ['Arcane']
}

types.each_pair do |k, v|
    if !Type.find_by(name: k).nil?
        next
    end

    type = Type.create({name: k, user_id: -1})
    v.each do |s|
        if Subtype.find_by(name: s).nil?
            subtype = type.subtypes.create({name: s, user_id: -1})
            subtype.save
        end
    end
end