# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Color.create color_name: 'Red'
Color.create color_name: 'Green'
Color.create color_name: 'Blue'
Color.create color_name: 'Black'
Color.create color_name: 'White'
Color.create color_name: 'None'
=begin
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
    type = Type.create name: k
    v.each do |subtype|
        Subtype.create name: subtype, type: type
    end
end
=end