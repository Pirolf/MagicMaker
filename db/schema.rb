# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150928000942) do

  create_table "card_enitities", force: :cascade do |t|
    t.integer  "deck_id"
    t.integer  "card_id"
    t.integer  "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cards", force: :cascade do |t|
    t.string   "image_path"
    t.integer  "attack",                              default: 0
    t.integer  "defense",                             default: 0
    t.text     "desc",                   limit: 1024
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
    t.string   "name",                   limit: 64,                     null: false
    t.string   "color",                               default: "White"
    t.integer  "mana_none",                           default: 0
    t.integer  "mana_red",                            default: 0
    t.integer  "mana_green",                          default: 0
    t.integer  "mana_blue",                           default: 0
    t.integer  "mana_black",                          default: 0
    t.integer  "mana_white",                          default: 0
    t.string   "image_art_file_name"
    t.string   "image_art_content_type"
    t.integer  "image_art_file_size"
    t.datetime "image_art_updated_at"
  end

  create_table "colors", force: :cascade do |t|
    t.string "color_name"
  end

  create_table "decks", force: :cascade do |t|
    t.string   "name"
    t.string   "desc"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "special_abilities", force: :cascade do |t|
    t.string   "name"
    t.string   "rule"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "special_ability_entities", force: :cascade do |t|
    t.integer  "card_id"
    t.integer  "special_ability_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  create_table "types", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
