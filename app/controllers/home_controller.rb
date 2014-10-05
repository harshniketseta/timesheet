class HomeController < ApplicationController

  def index
    if current_user.present?
      redirect_to "/dashboard"
    end
  end

end
