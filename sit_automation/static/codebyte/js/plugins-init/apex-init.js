(function($) {
    "use strict" 

	
	/* function draw() {
		
	} */

 var dzSparkLine = function(){
	//let draw = Chart.controllers.line.__super__.draw; //draw shadow
	
	var screenWidth = $(window).width();
	var overiewChart = function(){
		var options = {
		 series: [{
		 name: 'Number of Projects',
		 type: 'column',
		 data: [75, 85, 72, 100, 50, 100, 80, 75, 95, 35, 75,100]
	   }, {
		 name: 'Revenue',
		 type: 'area',
		 data: [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50,42]
	   }, {
		 name: 'Active Projects',
		 type: 'line',
		 data: [30, 25, 45, 30, 25, 35, 20, 45, 35, 20, 35,20]
	   }],
		 chart: {
		 height: 300,
		 type: 'line',
		 stacked: false,
		 toolbar: {
			   show: false,
		   },
	   },
	   stroke: {
		 width: [0, 1, 1],
		 curve: 'straight',
		 dashArray: [0, 0, 5]
	   },
	   legend: {
		   fontSize: '13px',
		   fontFamily: 'poppins',
			labels: {
				 colors:'#888888', 
			}
	   },
	   plotOptions: {
		 bar: {
		   columnWidth: '18%',
			borderRadius:6	,
		 }
	   },
	   
	   fill: {
		
		 type : 'gradient',
		 gradient: {
		   inverseColors: false,
		   shade: 'light',
		   type: "vertical",
		 
		   colorStops : [
			   [
				   {
					 offset: 0,
					 color: 'var(--primary)',
					 opacity: 1
				   },
				   {
					 offset: 100,
					 color: 'var(--primary)',
					 opacity: 1
				   }
			   ],
			   [
				   {
					 offset: 0,
					 color: '#3AC977',
					 opacity: 1
				   },
				   {
					 offset: 0.4,
					 color: '#3AC977',
					 opacity: .15
				   },
				   {
					 offset: 100,
					 color: '#3AC977',
					 opacity: 0
				   }
			   ],
			   [
				   {
					 offset: 0,
					 color: '#FF5E5E',
					 opacity: 1
				   },
				   {
					 offset: 100,
					 color: '#FF5E5E',
					 opacity: 1
				   }
			   ],
		   ],
		   stops: [0, 100, 100, 100]
		 }
	   },
	   colors:["var(--primary)","#3AC977","#FF5E5E"],
	   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
		 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	   ],
	   markers: {
		 size: 0
	   },
	   xaxis: {
		 type: 'month',
		 labels: {
			  style: {
				  fontSize: '13px',
				  colors:'#888888',
			  },
		 },
	   },
	   yaxis: {
		 min: 0,
		 tickAmount: 4,
		 labels: {
			  style: {
				  fontSize: '13px',
				  colors:'#888888',
			  },
		 },
	   },
	   tooltip: {
		 shared: true,
		 intersect: false,
		 y: {
		   formatter: function (y) {
			 if (typeof y !== "undefined") {
			   return y.toFixed(0) + " points";
			 }
			 return y;
	   
		   }
		 }
	   }
	   };

	   var chart = new ApexCharts(document.querySelector("#overiewChart"), options);
	   chart.render();
	   
	
	
   }

//    market chart
var marketChart = function(){
	var options = {
	 series: [{
	 name: 'series1',
	 data: [200, 400, 300, 400, 200, 400, 200,300, 200, 300]
   }, {
	 name: 'series2',
	 data: [500, 300, 400, 200, 500, 200, 400, 300, 500, 200]
   }],
	 chart: {
	 height: 300,
	 type: 'area',
	 toolbar:{
		 show:false
	 }
   },
   colors:["#1D3573","#EAC947"],
   dataLabels: {
	 enabled: false
   },
   stroke: {
	 curve: 'smooth',
	 width:3
   },
   legend:{
	   show:false
   },
   grid:{
	   show:false,
	   strokeDashArray: 6,
	   borderColor: '#dadada',
   },
   yaxis: {
	 labels: {
	   style: {
		   colors: '#B5B5C3',
		   fontSize: '12px',
		   fontFamily: 'Poppins',
		   fontWeight: 400
		   
	   },
	   formatter: function (value) {
		 return value + "k";
	   }
	 },
   },
   xaxis: {
	 categories: ["Week 01","Week 02","Week 03","Week 04","Week 05","Week 06","Week 07","Week 08","Week 09","Week 10"],
	 labels:{
		 style: {
		   colors: '#B5B5C3',
		   fontSize: '12px',
		   fontFamily: 'Poppins',
		   fontWeight: 400
		   
	   },
	 }
   },
   fill:{
	   type:'solid',
	   opacity:0.05
   },
   tooltip: {
	 x: {
	   format: 'dd/MM/yy HH:mm'
	 },
   },
   };

   var chart = new ApexCharts(document.querySelector("#marketChart"), options);
   chart.render();
}	

// coloum
var chartBar = function(){
		
	var options = {
		  series: [
			{
				name: 'Running',
				data: [50, 18, 70, 40, 90, 70, 20],
				//radius: 12,	
			}, 
			{
			  name: 'Cycling',
			  data: [80, 40, 55, 20, 45, 30, 80]
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
			columnWidth: '57%',
			//endingShape: "rounded",
			  borderRadius: 10,
		  },
		  
		},
		states: {
		  hover: {
			filter: 'none',
		  }
		},
		colors:['#D2D2D2', '#EBEBEB'],
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
				colors: '#000000',
				
				},
			markers: {
			width: 18,
			height: 18,
			strokeWidth: 0,
			strokeColor: '#fff',
			fillColors: undefined,
			radius: 12,	
			}
		},
		stroke: {
		  show: true,
		  width: 4,
		  colors: ['transparent']
		},
		grid: {
			borderColor: '#eee',
		},
		xaxis: {
			
		  categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		  labels: {
		   style: {
			  colors: '#787878',
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
				  colors: '#787878',
				  fontSize: '13px',
				   fontFamily: 'poppins',
				  fontWeight: 100,
				  cssClass: 'apexcharts-xaxis-label',
			  },
		  },
		},
		fill: {
		  opacity: 1,
		  colors:['var(--primary)', 'var(--secondary)'],
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

// line


var lineBar = function(){
	var optionsArea = {
	  series: [{
		name: "Distance",
		type: 'line',
	   
		data: [90, 120, 70, 130, 80, 140, 50]
	  }
	],
	  chart: {
		height: 300,
	  type: 'area',
	  group: 'social',
	  toolbar: {
		show: false
	  },
	  zoom: {
		enabled: false
	  },
	  dropShadow: {
			enabled: true,
			enabledOnSeries: undefined,
			top: 5,
			left: 0,
			blur: 3,
			color: '#000',
			opacity: 0.1
		},
	},
	
	dataLabels: {
	  enabled: false
	},
	stroke: {
	  width: [3],
	  colors:['var(--primary)'],
	  curve: 'smooth'
	},
	legend: {
		show:false,
	  tooltipHoverFormatter: function(val, opts) {
		return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
	  },
	  
	},
	markers: {
	  strokeWidth: [3],
	  strokeColors: ['#0B2A97'],
	  border:0,
	  colors:['#fff'],
	  hover: {
		size: 5,
	  }
	},
	xaxis: {
	  categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
	  axisTicks:false,
	  labels: {
	   style: {
		  colors: '#818995',
		  fontSize: '12px',
		   fontFamily: 'Poppins',
		  fontWeight: 50,
		  
		},
	  },
	},
	yaxis: {
		labels: {
		offsetX:-16,
	   style: {
		  colors: '#818995',
		  fontSize: '12px',
		   fontFamily: 'Poppins',
		  fontWeight: 50,
		  
		},
	  },
	},
	fill: {
		colors:['#0b2a97'],
		type:'solid',
		opacity: 1
	},
	colors:['#0B2A97'],
	grid: {
	  borderColor: 'transparent',
	  xaxis: {
		lines: {
		  show: true
		}
	  }
	},
	 responsive: [
	 {
		breakpoint:1601,
		options:{
			chart: {
				//height:400
			},
		},
	 }
		,{
		breakpoint: 768,
		options: {
			chart: {
				height:250
			},
			markers: {
			  strokeWidth: [4],
			  strokeColors: ['#0B2A97'],
			  border:0,
			  colors:['#fff'],
			  hover: {
				size: 6,
			  }
			},
			stroke: {
			  width: [6],
			  colors:['#0B2A97'],
			  curve: 'smooth'
			},
		}
	 }
	 ] 
	};
	var lineBar = new ApexCharts(document.querySelector("#lineBar"), optionsArea);
	lineBar.render();
	

}
var chartTimeline = function(){
		
	var optionsTimeline = {
		chart: {
			type: "bar",
			height: 300,
			stacked: true,
			toolbar: {
				show: false
			},
			sparkline: {
				//enabled: true
			},
			backgroundBarRadius: 5,
			offsetX: -10,
		},
		series: [
			 {
				name: "New Clients",
				data: [20, 40, 60, 35, 50, 70, 30, 15, 35, 40, 50, 60, 75, 40, 25, 70, 20, 40, 65, 50]
			},
			{
				name: "Retained Clients",
				data: [-28, -32, -12, -5, -35, -10, -30, -29, -18, -25, -38, -12, -22, -39, -35, -30, -10, -20, -35, -38]
			} 
		],
		
		plotOptions: {
			bar: {
				columnWidth: "45%",
				horizontal: false,
				borderRadius: 0,
				endingShape: "rounded",
				

			},
			distributed: true
		},
		colors:['var(--primary)', 'var(--secondary)'],
		
		grid: {
			show: true,
		},
		legend: {
			show: false
		},
		fill: {
			opacity: 1
		},
		
		dataLabels: {
			enabled: false,
			colors:['#dd2f6e', '#3e4954'],
			dropShadow: {
				enabled: true,
				top: 1,
				left: 1,
				blur: 1,
				opacity: 1
			}
		},
		xaxis: {
			categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
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
			axisBorder: {
				show: false,
			},
		},
		
		yaxis: {
			//show: false
			labels: {
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
	var chartTimelineRender =  new ApexCharts(document.querySelector("#chartTimeline"), optionsTimeline);
	 chartTimelineRender.render();
}

// pie chart

var pieChart = function(){
	var options = {
	  series: [10,20,35,35],
	  chart: {
	  type: 'donut',
	  height:200,
	  innerRadius: 50,  
	},
	dataLabels: {
	  enabled: false
	},
	stroke: {
	  width: 0,
	},
	plotOptions: {
		  pie: {
			 startAngle: 0, 
			  endAngle: 360,
			 donut: {
				  size: '80%',
			 },
		 },
	},
	colors:[ 'var(--secondary)', '#09bd3c' ,'#00afef', 'var(--primary)'],
	legend: {
		  position: 'bottom',
		  show:false
		},
	responsive: [{
	  breakpoint: 768,
	  options: { 
	   chart: {
		  width:200
		},
	  }
	}]
	};

	var chart = new ApexCharts(document.querySelector("#pieChart"), options);
	chart.render();
}

  var marketChart2 = function () {
      if (jQuery('#marketChart2').length > 0) {

        var options = {
          series: [{
            data: [{
              x: new Date(1538778600000),
              y: [6629.81, 6650.5, 6623.04, 6633.33]
            },
            {
              x: new Date(1538780400000),
              y: [6632.01, 6643.59, 6620, 6630.11]
            },
            {
              x: new Date(1538782200000),
              y: [6630.71, 6648.95, 6623.34, 6635.65]
            },
            {
              x: new Date(1538784000000),
              y: [6635.65, 6651, 6629.67, 6638.24]
            },
            {
              x: new Date(1538785800000),
              y: [6638.24, 6640, 6620, 6624.47]
            },
            {
              x: new Date(1538787600000),
              y: [6624.53, 6636.03, 6621.68, 6624.31]
            },
            {
              x: new Date(1538789400000),
              y: [6624.61, 6632.2, 6617, 6626.02]
            },
            {
              x: new Date(1538791200000),
              y: [6627, 6627.62, 6584.22, 6603.02]
            },
            {
              x: new Date(1538793000000),
              y: [6605, 6608.03, 6598.95, 6604.01]
            },
            {
              x: new Date(1538794800000),
              y: [6604.5, 6614.4, 6602.26, 6608.02]
            },
            {
              x: new Date(1538796600000),
              y: [6608.02, 6610.68, 6601.99, 6608.91]
            },
            {
              x: new Date(1538798400000),
              y: [6608.91, 6618.99, 6608.01, 6612]
            },
            {
              x: new Date(1538800200000),
              y: [6612, 6615.13, 6605.09, 6612]
            },
            {
              x: new Date(1538802000000),
              y: [6612, 6624.12, 6608.43, 6622.95]
            },
            {
              x: new Date(1538803800000),
              y: [6623.91, 6623.91, 6615, 6615.67]
            },
            {
              x: new Date(1538805600000),
              y: [6618.69, 6618.74, 6610, 6610.4]
            },
            {
              x: new Date(1538807400000),
              y: [6611, 6622.78, 6610.4, 6614.9]
            },
            {
              x: new Date(1538809200000),
              y: [6614.9, 6626.2, 6613.33, 6623.45]
            },
            {
              x: new Date(1538811000000),
              y: [6623.48, 6627, 6618.38, 6620.35]
            },
            {
              x: new Date(1538812800000),
              y: [6619.43, 6620.35, 6610.05, 6615.53]
            },
            {
              x: new Date(1538814600000),
              y: [6615.53, 6617.93, 6610, 6615.19]
            },
            {
              x: new Date(1538816400000),
              y: [6615.19, 6621.6, 6608.2, 6620]
            },
            {
              x: new Date(1538818200000),
              y: [6619.54, 6625.17, 6614.15, 6620]
            },
            {
              x: new Date(1538820000000),
              y: [6620.33, 6634.15, 6617.24, 6624.61]
            },
            {
              x: new Date(1538821800000),
              y: [6625.95, 6626, 6611.66, 6617.58]
            },
            {
              x: new Date(1538823600000),
              y: [6619, 6625.97, 6595.27, 6598.86]
            },
            {
              x: new Date(1538825400000),
              y: [6598.86, 6598.88, 6570, 6587.16]
            },
            {
              x: new Date(1538827200000),
              y: [6588.86, 6600, 6580, 6593.4]
            },
            {
              x: new Date(1538829000000),
              y: [6593.99, 6598.89, 6585, 6587.81]
            },
            {
              x: new Date(1538830800000),
              y: [6587.81, 6592.73, 6567.14, 6578]
            },
            {
              x: new Date(1538832600000),
              y: [6578.35, 6581.72, 6567.39, 6579]
            },
            {
              x: new Date(1538834400000),
              y: [6579.38, 6580.92, 6566.77, 6575.96]
            },
            {
              x: new Date(1538836200000),
              y: [6575.96, 6589, 6571.77, 6588.92]
            },
            {
              x: new Date(1538838000000),
              y: [6588.92, 6594, 6577.55, 6589.22]
            },
            {
              x: new Date(1538839800000),
              y: [6589.3, 6598.89, 6589.1, 6596.08]
            },
            {
              x: new Date(1538841600000),
              y: [6597.5, 6600, 6588.39, 6596.25]
            },
            {
              x: new Date(1538843400000),
              y: [6598.03, 6600, 6588.73, 6595.97]
            },
            {
              x: new Date(1538845200000),
              y: [6595.97, 6602.01, 6588.17, 6602]
            },
            {
              x: new Date(1538847000000),
              y: [6602, 6607, 6596.51, 6599.95]
            },
            {
              x: new Date(1538848800000),
              y: [6600.63, 6601.21, 6590.39, 6591.02]
            },
            {
              x: new Date(1538850600000),
              y: [6591.02, 6603.08, 6591, 6591]
            },
            {
              x: new Date(1538852400000),
              y: [6591, 6601.32, 6585, 6592]
            },
            {
              x: new Date(1538854200000),
              y: [6593.13, 6596.01, 6590, 6593.34]
            },
            {
              x: new Date(1538856000000),
              y: [6593.34, 6604.76, 6582.63, 6593.86]
            },
            {
              x: new Date(1538857800000),
              y: [6593.86, 6604.28, 6586.57, 6600.01]
            },
            {
              x: new Date(1538859600000),
              y: [6601.81, 6603.21, 6592.78, 6596.25]
            },
            {
              x: new Date(1538861400000),
              y: [6596.25, 6604.2, 6590, 6602.99]
            },
            {
              x: new Date(1538863200000),
              y: [6602.99, 6606, 6584.99, 6587.81]
            },
            {
              x: new Date(1538865000000),
              y: [6587.81, 6595, 6583.27, 6591.96]
            },
            {
              x: new Date(1538866800000),
              y: [6591.97, 6596.07, 6585, 6588.39]
            },
            {
              x: new Date(1538868600000),
              y: [6587.6, 6598.21, 6587.6, 6594.27]
            },
            {
              x: new Date(1538870400000),
              y: [6596.44, 6601, 6590, 6596.55]
            },
            {
              x: new Date(1538872200000),
              y: [6598.91, 6605, 6596.61, 6600.02]
            },
            {
              x: new Date(1538874000000),
              y: [6600.55, 6605, 6589.14, 6593.01]
            },
            {
              x: new Date(1538875800000),
              y: [6593.15, 6605, 6592, 6603.06]
            },
            {
              x: new Date(1538877600000),
              y: [6603.07, 6604.5, 6599.09, 6603.89]
            },
            {
              x: new Date(1538879400000),
              y: [6604.44, 6604.44, 6600, 6603.5]
            },
            {
              x: new Date(1538881200000),
              y: [6603.5, 6603.99, 6597.5, 6603.86]
            },
            {
              x: new Date(1538883000000),
              y: [6603.85, 6605, 6600, 6604.07]
            },
            {
              x: new Date(1538884800000),
              y: [6604.98, 6606, 6604.07, 6606]
            },
            ]
          }],
          chart: {
            type: 'candlestick',
            height: 300,
            toolbar: {
              show: false,
            }
          },
          grid: {
            show: false,
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: '#3ab67a',
                downward: '#fd5353'
              }
            }
          },
          title: {
            text: '',
            align: 'left'
          },
          xaxis: {
            type: 'datetime',
        
            labels: {
              style: {
                color: 'var(--text)',

              },
            }
          },
         
          yaxis: {
            opposite: true,
            tooltip: {
              enabled: true
            }
          }
        };
	  }
	  var marketOverviewChart = new ApexCharts(document.querySelector("#marketChart2"), options);
        marketOverviewChart.render();


      
    }
	// radial

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
	

	/* Function ============ */
	return {
		init:function(){
			
		},
		
		
		load:function(){
			overiewChart();
			marketChart();
			chartBar();
			lineBar();
			chartTimeline();
			pieChart();
			marketChart2();
			redial1();
		},
		
		resize:function(){
			// barChart1();	
			// barChart2();
			// barChart3();	
			// lineChart1();	
			// lineChart2();		
			// lineChart3();
			// lineChart03();
			// areaChart1();
			// areaChart2();
			// areaChart3();
			// radarChart();
			// pieChart();
			// doughnutChart(); 
			// polarChart(); 
		}
	}

}();


	
jQuery(window).on('load',function(){
	dzSparkLine.load();
});

jQuery(window).on('resize',function(){
	//dzSparkLine.resize();
	setTimeout(function(){ dzSparkLine.resize(); }, 1000);
});
	
})(jQuery);