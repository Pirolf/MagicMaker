class CardsController < ApplicationController
  helper CardsHelper, TypesHelper
  before_action :set_card, only: [:show, :edit, :update, :destroy]

  # GET /cards
  # GET /cards.json
  def index
    if user_signed_in?
      @cards = current_user.cards
    else
      redirect_to new_user_session_url
    end
  end

  # GET /cards/1
  # GET /cards/1.json
  def show
    if !user_signed_in?
      redirect_to new_user_session_url
    end
  end

  # GET /cards/new
  def new
    @card = Card.new
  end

  # GET /cards/1/edit
  def edit
    if !user_signed_in?
      redirect_to new_user_session_url
    end
  end

  # POST /cards
  # POST /cards.json
  def create
    if user_signed_in?
      @card = current_user.cards.build(card_params)
      respond_to do |format|
        if @card.save
          format.html { redirect_to new_card_url, notice: "Card Created!" }
          format.json { render :show, status: :created, location: @card }
        else
          format.html { render :new }
          format.json { render json: @card.errors, status: :unprocessable_entity }
        end
      end
    else
      redirect_to new_user_session_url
    end
  end

  # PATCH/PUT /cards/1
  # PATCH/PUT /cards/1.json
  def update
    if user_signed_in?
      respond_to do |format|
        if @card.update(card_params)
          format.js { render 'success', locals: { message: 'Card Updated!'} }
          format.json { render :show, status: :ok, location: @card }
        else
          format.html { render :edit }
          format.json { render json: @card.errors, status: :unprocessable_entity }
        end
      end
    else
      respond_to do |format|
        format.all { render nothing: true, status: :unauthorized }
      end
    end
  end

  # DELETE /cards/1
  # DELETE /cards/1.json
  def destroy
    if !user_signed_in?
      respond_to do |format|
        format.all { render nothing: true, status: :unauthorized }
      end
    end
    
    @card.destroy
    respond_to do |format|
      format.html { redirect_to cards_url, notice: 'Card was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card
      if user_signed_in?
        @card = current_user.cards.find(params[:id])
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def card_params
      params.require(:card).permit(
        :image_path, :image_art,
        :attack, :defense, :name, :desc, :color,
        :mana_red, :mana_green, :mana_blue, :mana_black, :mana_white, :mana_none,
        :type_id, :subtype_id,
        :special_ability_ids => [])
    end
end
