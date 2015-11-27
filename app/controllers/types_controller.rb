class TypesController < ApplicationController
  before_action :set_type, only: [:show, :edit, :update, :destroy]

  # GET /types
  # GET /types.json
  def index
    if user_signed_in?
      @types = current_user.types
    else
      redirect_to new_user_session_url
    end
  end

  # GET /types/1
  # GET /types/1.json
  def show
    if !user_signed_in?
      redirect_to new_user_session_url
    end
  end

  # GET /types/new
  def new
    if !user_signed_in?
      redirect_to new_user_session_url
    end

    @type = Type.new
  end

  # GET /types/1/edit
  def edit
    if !user_signed_in?
      redirect_to new_user_session_url
    end
  end

  # POST /types
  # POST /types.json
  def create
    if !user_signed_in?
      redirect_to new_user_session_url
    end

    @type = current_user.types.build(type_params)
    respond_to do |format|
      if @type.save
        format.html { redirect_to @type, notice: 'Type was successfully created.' }
        format.json { render :show, status: :created, location: @type }
      else
        format.html { render :new }
        format.json { render json: @type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /types/1
  # PATCH/PUT /types/1.json
  def update
    if !user_signed_in?
      respond_to do |format|
        format.all { render nothing: true, status: :unauthorized }
      end
    end

    respond_to do |format|
      if @type.update(type_params)
        format.html { redirect_to @type, notice: 'Type was successfully updated.' }
        format.json { render :show, status: :ok, location: @type }
      else
        format.html { render :edit }
        format.json { render json: @type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /types/1
  # DELETE /types/1.json
  def destroy
    if !user_signed_in?
      respond_to do |format|
        format.all { render nothing: true, status: :unauthorized }
      end
    end
    @type.destroy
    respond_to do |format|
      format.html { redirect_to types_url, notice: 'Type was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_type
      if user_signed_in?
        @type = current_user.types.find(params[:id])
        @subtype = Subtype.new
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def type_params
      params.require(:type).permit(:name)
    end
end
