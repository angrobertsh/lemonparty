class Api::LemonsController < ApplicationController

  def index
    @lemons = Lemon.in_bounds(params[:filters][:bounds])
  end

  def create
    @lemon = Lemon.new(lemon_params)
    if @lemon.save
      render "api/lemons/show"
    else
      @errors = @lemon.errors.full_messages
      render(
        "api/shared/error",
        status: 422
      )
    end
  end

  def update
    @lemon = Lemon.find_by(id: params[:id])

    if @lemon.update(lemon_params)
      render "api/lemons/show"
    else
      @errors = @lemon.errors.full_messages
      render(
        "api/shared/error",
        status: 422
      )
    end
  end

  def destroy
    @lemon = Lemon.find_by(id: params[:id])

    @lemon.destroy

    render "api/lemons/show"
  end

  private

  def lemon_params
    params.require(:lemon).permit(:tree, :location, :note, :finder, :lat, :lng, :token)
  end
end
