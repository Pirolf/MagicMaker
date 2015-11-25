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

ActiveRecord::Schema.define(version: 20151125062639) do

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
    t.datetime "created_at",                                           null: false
    t.datetime "updated_at",                                           null: false
    t.string   "name",                   limit: 64,                    null: false
    t.string   "color",                               default: "None"
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
    t.integer  "type_id"
    t.integer  "subtype_id"
    t.integer  "user_id"
  end

  add_index "cards", ["subtype_id"], name: "index_cards_on_subtype_id"
  add_index "cards", ["type_id"], name: "index_cards_on_type_id"
  add_index "cards", ["user_id"], name: "index_cards_on_user_id"

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

  create_table "subtypes", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "type_id"
    t.integer  "user_id"
  end

  add_index "subtypes", ["type_id"], name: "index_subtypes_on_type_id"
  add_index "subtypes", ["user_id"], name: "index_subtypes_on_user_id"

  create_table "types", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  add_index "types", ["user_id"], name: "index_types_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "email",                             default: "", null: false
    t.string   "encrypted_password",                default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                     default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.string   "username",               limit: 64, default: "", null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  add_index "users", ["username"], name: "index_users_on_username", unique: true

end
