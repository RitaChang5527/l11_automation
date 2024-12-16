

(function($) {
    /* "use strict" */
	
 var icChartlist = function(){
	
	var screenWidth = $(window).width();
	//let draw = Chart.controllers.line.__super__.draw; //draw shadow
		
	var columnChart = function(){
		var options = {
			series: [{
				name: 'Aplication Sent',
				data: [40, 55, 15,55]
			}, {
				name: 'Appllication Answered',
				data: [40, 55, 35,55]
			}, {
				name: 'Hired',
				data: [40, 17, 55, 55]
			}],
			chart: {
				type: 'bar',
				height: 120,
				width:150,
				stacked: true,
				toolbar: {
					show: false,
				}
			},
			responsive: [
				{
					breakpoint: 1600,
					options: {
						chart: {
							width:100,
						},
						legend: {
							position: 'bottom',
							offsetX: -10,
							offsetY: 0,
						}
					}
				},{
					breakpoint: 1600,
					options: {
						chart: {
							width:80,
						},
						legend: {
							position: 'bottom',
							offsetX: -10,
							offsetY: 0,
						}
					}
				}
			],
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '30%',
					colors: {
						backgroundBarColors: ['#ECECEC', '#ECECEC', '#ECECEC', '#ECECEC'],
						backgroundBarOpacity: 1,
						
					},
				},
				
			},
			colors:['#ECECEC', '#1d3573', '#1d3573'],
			xaxis: {
				show: false,
				axisBorder: {
					show: false,
				},
				axisTicks:{
					show: false,
				},
				labels: {
					show: false,
					style: {
						colors: '#828282',
						fontSize: '14px',
						fontFamily: 'Poppins',
						fontWeight: 'light',
						cssClass: 'apexcharts-xaxis-label',
					},
				},
				
				crosshairs: {
					show: false,
				},
				
				categories: ['Sun', 'Mon', 'Tue'],
			},
			yaxis: {
				show: false
			},
			grid: {
				show: false,
			},
			toolbar: {
				enabled: false,
			},
			dataLabels: {
			  enabled: false
			},
			legend: {
				show:false
			},
			fill: {
				opacity: 1
			}
		};

		var chart = new ApexCharts(document.querySelector("#columnChart"), options);
		chart.render();
	}
	var NewCustomers = function(){
		var options = {
		  series: [
			{
				name: 'Net Profit',
				data: [100,300, 100, 400, 200, 400],
				/* radius: 30,	 */
			}, 				
		],
			chart: {
			type: 'line',
			height: 50,
			width: 80,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false
			},
			sparkline: {
				enabled: true
			}
			
		},
		responsive: [{
          breakpoint: 1600,
          options: {
           chart: {
				height: 50,
				width: 50,
			}
          }
        }],
		
		colors:['var(--primary)'],
		dataLabels: {
		  enabled: false,
		},

		legend: {
			show: false,
		},
		stroke: {
		  show: true,
		  width: 6,
		  curve:'smooth',
		  colors:['var(--primary)'],
		},
		
		grid: {
			show:false,
			borderColor: '#eee',
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0

			}
		},
		states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                        value: 0
                    }
                }
            },
		xaxis: {
			categories: ['Jan', 'feb', 'Mar', 'Apr', 'May'],
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false
			},
			labels: {
				show: false,
				style: {
					fontSize: '12px',
				}
			},
			crosshairs: {
				show: false,
				position: 'front',
				stroke: {
					width: 1,
					dashArray: 3
				}
			},
			tooltip: {
				enabled: true,
				formatter: undefined,
				offsetY: 0,
				style: {
					fontSize: '12px',
				}
			}
		},
		yaxis: {
			show: false,
		},
		fill: {
		  opacity: 1,
		  colors:'#FB3E7A'
		},
		tooltip: {
			enabled:false,
			style: {
				fontSize: '12px',
			},
			y: {
				formatter: function(val) {
					return "$" + val + " thousands"
				}
			}
		}
		
		};

		var chartBar1 = new ApexCharts(document.querySelector("#NewCustomers"), options);
		chartBar1.render();
	 
	}
	var NewCustomers1 = function(){
		var options = {
		  series: [
			{
				name: 'Net Profit',
				data: [100,300, 200, 400, 100, 400],
				/* radius: 30,	 */
			}, 				
		],
			chart: {
			type: 'line',
			height: 50,
			width: 80,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false
			},
			sparkline: {
				enabled: true
			}
			
		},
		responsive: [{
          breakpoint: 1600,
          options: {
           chart: {
				height: 50,
				width: 50,
			}
          }
        }],
		colors:['#0E8A74'],
		dataLabels: {
		  enabled: false,
		},

		legend: {
			show: false,
		},
		stroke: {
		  show: true,
		  width: 6,
		  curve:'smooth',
		  colors:['var(--primary)'],
		},
		
		grid: {
			show:false,
			borderColor: '#eee',
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0

			}
		},
		states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                        value: 0
                    }
                }
            },
		xaxis: {
			categories: ['Jan', 'feb', 'Mar', 'Apr', 'May'],
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false
			},
			labels: {
				show: false,
				style: {
					fontSize: '12px',
				}
			},
			crosshairs: {
				show: false,
				position: 'front',
				stroke: {
					width: 1,
					dashArray: 3
				}
			},
			tooltip: {
				enabled: true,
				formatter: undefined,
				offsetY: 0,
				style: {
					fontSize: '12px',
				}
			}
		},
		yaxis: {
			show: false,
		},
		fill: {
		  opacity: 1,
		  colors:'#FB3E7A'
		},
		tooltip: {
			enabled:false,
			style: {
				fontSize: '12px',
			},
			y: {
				formatter: function(val) {
					return "$" + val + " thousands"
				}
			}
		}
		};

		var chartBar1 = new ApexCharts(document.querySelector("#NewCustomers1"), options);
		chartBar1.render();
	 
	}
	var chartBar = function(){
		
		var options = {
			  series: [
				{
					name: 'Running',
					data: [50, 18, 90, 40, 90, 80, 60],
					//radius: 12,	
				}, 
				{
				  name: 'Cycling',
				  data: [80, 40, 55, 20, 45, 50, 80]
				}, 
				
			],
				chart: {
				type: 'bar',
				height: 300,
				
				toolbar: {
					show: false,
				},
				
			},
			plotOptions: {
			  bar: {
				horizontal: false,
				columnWidth: '50%',
				endingShape: "rounded",
				borderRadius: 8,
			  },
			  
			},
			states: {
			  hover: {
				filter: 'none',
			  }
			},
			colors:['var(--primary)', '#09BD3C'],
			dataLabels: {
			  enabled: false,
			},
			markers: {
		shape: "circle",
		},
		
		
			legend: {
				show: false,
				fontSize: '12px',
				labels: {
					colors: 'var(--text)',
					
					},
				markers: {
				width: 18,
				height: 18,
				strokeWidth: 10,
				strokeColor: '#fff',
				fillColors: undefined,
				radius: 12,	
				}
			},
			stroke: {
			  show: true,
			  width: 4,
			  curve: 'smooth',
			  lineCap: 'round',
			  colors: ['transparent']
			},
			grid: {
				borderColor: 'var(--border)',
				strokeDashArray: 5,
				
			},
			xaxis: {
				 position: 'bottom',
			  categories: ['Week 01', 'Week 02', 'Week 03', 'Week 04', 'Week 05','Week 06','Week 07'],
			  labels: {
			   style: {
				  colors: 'var(--text)',
				  fontSize: '13px',
				  fontFamily: 'poppins',
				  fontWeight: 100,
				  cssClass: 'apexcharts-xaxis-label',
				},
			  },
			  crosshairs: {
			  show: false,
			  }
			},
			yaxis: {
				labels: {
					offsetX:-16,
				   style: {
					  colors: 'var(--text)',
					  fontSize: '13px',
					   fontFamily: 'poppins',
					  fontWeight: 100,
					  cssClass: 'apexcharts-xaxis-label',
				  },
			  },
			},
			fill: {
				type: 'gradient',
				gradient: {
					shade: 'white',
					type: "vertical",
					shadeIntensity: 0.2,
					gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
					inverseColors: true,
					opacityFrom: 1,
					opacityTo: 1,
					stops: [0, 50, 50],
					colorStops: []
				}
			}, 
			tooltip: {
			  y: {
				formatter: function (val) {
				  return "$ " + val + " thousands"
				}
			  }
			},
			};

			var chartBar1 = new ApexCharts(document.querySelector("#chartBar"), options);
			chartBar1.render();
	}
	var redial = function(){
		  var options = {
          series: [30],
          chart: {
          type: 'radialBar',
          offsetY: 0,
		  height:200,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -190,
            endAngle: 190,
            track: {
              background: "var(--light)",
              strokeWidth: '100%',
              margin: 5,
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: 12,
                fontSize: '22px',
				color:'#171B1E',
				fontWeight:700,
              }
            }
          }
        },
		responsive: [{
          breakpoint: 1600,
          options: {
           chart: {
			  height:200
			},
          }
        }
		
		],
        grid: {
          padding: {
            top: -10
          }
        },
		/* stroke: {
          dashArray: 4,
		  colors:'#6EC51E'
        }, */
        fill: {
          type: '',
		  colors:'#09BD3C',
          /* gradient: {
              shade: 'white',
              shadeIntensity: 0.15,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 65, 91]
          }, */
        },
        labels: ['Average Results'],
        };

        var chart = new ApexCharts(document.querySelector("#redial"), options);
        chart.render();
	
	
	}
	var chartTimeline3 = function(){
		var optionsTimeline = {
			chart: {
				type: "bar",
				height: 320,
				stacked: true,
				toolbar: {
					show: false
				},
				sparkline: {
					//enabled: true
				},
				backgroundBarRadius: 5,
				offsetX: 0,
			},
			series: [
				 {
					name: "New Clients",
					data: [10, 50, 65, 20, 30]
				},
				{
					name: "Retained Clients",
					data: [-40, -60, -90, -25, -40]
				} 
			],
			
			plotOptions: {
				bar: {
					columnWidth: "30%",
					endingShape: "rounded",
					colors: {
						backgroundBarColors: ['#F4F4F4', '#F4F4F4', '#F4F4F4', '#F4F4F4', '#F4F4F4'],
						backgroundBarOpacity: 1,
						backgroundBarRadius: 5,
						opacity:0
					},

				},
				distributed: true
			},
			colors:['#EAC947', '#09BD3C'],
			
			grid: {
				show: false,
			},
			legend: {
				show: false
			},
			fill: {
				opacity: 1
			},
			dataLabels: {
				enabled: false,
				colors:['#2953E8', '#09268A'],
				dropShadow: {
					enabled: true,
					top: 1,
					left: 1,
					blur: 1,
					opacity: 1
				}
			},
			xaxis: {
				categories: ['01', '02', '03', '04', '05'],
				labels: {
					style: {
						colors: '#787878',
						fontSize: '13px',
						fontFamily: 'Poppins',
						fontWeight: 400
						
					},
				},
				crosshairs: {
					show: false,
				},
				axisTicks:{
					show:false
				},
				axisBorder: {
					show: false,
				},
			},
			
			yaxis: {
				//show: false
				labels: {
					offsetX:-15,
					style: {
						colors: '#787878',
						fontSize: '13px',
						fontFamily: 'Poppins',
						fontWeight: 400
						
					},
				},
			},
			
			tooltip: {
				x: {
					show: true
				}
			}
		};
		var chartTimelineRender =  new ApexCharts(document.querySelector("#chartTimeline3"), optionsTimeline);
		 chartTimelineRender.render();
	}
	var redial1 = function(){
		  var options = {
          series: [50],
          chart: {
          type: 'radialBar',
          offsetY: 0,
		  height:250,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -130,
            endAngle: 130,
            track: {
              background: "#F1EAFF",
              strokeWidth: '100%',
              margin: 5,
            },
			
			hollow: {
              margin: 30,
              size: '50%',
              background: '#F1EAFF',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
            },
			
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: 5,
                fontSize: '22px',
				color:'#1d3573',
				fontWeight:700,
              }
            }
          }
        },
		responsive: [{
          breakpoint: 1600,
          options: {
           chart: {
			  height:200
			},
          }
        }
		
		],
        grid: {
          padding: {
            top: -10
          }
        },
		/* stroke: {
          dashArray: 4,
		  colors:'#6EC51E'
        }, */
        fill: {
          type: 'gradient',
		  colors:'#1D3573',
          gradient: {
              shade: 'white',
              shadeIntensity: 0.15,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 65, 91]
          },
        },
        labels: ['Average Results'],
        };

        var chart = new ApexCharts(document.querySelector("#redial1"), options);
        chart.render();
	
	
	}
	var emailchart = function(){
		 var options = {
          series: [27, 11, 22,15,25],
          chart: {
          type: 'donut',
		  height:250
        },
		dataLabels:{
			enabled: false
		},
		stroke: {
          width: 0,
        },
		colors:['#8621C3', '#09BD3C', '#FAF119','#FF5151','#6499FF'],
		legend: {
              position: 'bottom',
			  show:false
            },
        responsive: [{
          breakpoint: 1800,
          options: {
           chart: {
			  height:200
			},
          }
        },
		{
          breakpoint: 1800,
          options: {
           chart: {
			  height:200
			},
          }
        }
		]
        };

        var chart = new ApexCharts(document.querySelector("#emailchart"), options);
        chart.render();
    
	}
	
	
	
	
	
	
	

	
 
	/* Function ============ */
		return {
			init:function(){
			},
			
			
			load:function(){
				columnChart();
				NewCustomers();
				NewCustomers1();
				chartBar();
				redial();
				chartTimeline3();
				redial1();
				emailchart();
				
			},
			
			resize:function(){
			}
		}
	
	}();

	
		
	jQuery(window).on('load',function(){
		setTimeout(function(){
			icChartlist.load();
		}, 1000); 
		
	});

     

})(jQuery);