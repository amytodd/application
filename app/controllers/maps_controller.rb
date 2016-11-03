class MapsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:search]

  def index
    @pins        = Pin.all.limit(4)
    @overlays    = Overlay.all.limit(4)
    @collections = Collection.all.limit(4)

  end

  def search
  end

  def show
    @pin = Pin.find(params[:id])
  end

  def create
    Rails.logger.info(pin_params.awesome_inspect)

    @pin = Pin.create!(pin_params)
  end

  private
  def pin_params
    params.require(:pin).permit!
  end
end