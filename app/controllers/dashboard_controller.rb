class DashboardController < ApplicationController

  include DashboardHelper

  before_action :set_type

  def index
    # Dashboard for the user.

    # * List projects
    # * Next Task
    # * Missing enteries.
    # *
  end
end
