import { Component, OnInit, OnDestroy } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5pie from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { AnalyticsService } from '../../../../core/services/analytics.service';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss'],
})
export class AnalyticsPageComponent implements OnInit, OnDestroy {
  private roleChartRoot?: am5.Root;
  private ageChartRoot?: am5.Root;
  private userCreationChartRoot?: am5.Root;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.analyticsService.getUserAnalytics().subscribe({
      next: (data) => {
        this.createRoleBarChart(data.role_data);
        this.createAgePieChart(data.age_data);
        this.createUserCreationBarChart(data.monthly_creation_data);
      },
      error: (err) => {
        console.error('Failed to fetch analytics data', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.disposeChart(this.roleChartRoot);
    this.disposeChart(this.ageChartRoot);
    this.disposeChart(this.userCreationChartRoot);
  }

  private disposeChart(chartRoot?: am5.Root): void {
    if (chartRoot) {
      chartRoot.dispose();
    }
  }

  private createRoleBarChart(data: any): void {
    this.roleChartRoot = am5.Root.new('roleChartDiv');
    this.roleChartRoot.setThemes([am5themes_Animated.new(this.roleChartRoot)]);

    const chart = this.roleChartRoot.container.children.push(
      am5xy.XYChart.new(this.roleChartRoot, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(this.roleChartRoot, {
        categoryField: 'role_name',
        renderer: am5xy.AxisRendererX.new(this.roleChartRoot, {}),
      })
    );
    xAxis.data.setAll(data);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(this.roleChartRoot, {
        renderer: am5xy.AxisRendererY.new(this.roleChartRoot, {}),
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(this.roleChartRoot, {
        xAxis,
        yAxis,
        valueYField: 'total_users',
        categoryXField: 'role_name',
        tooltip: am5.Tooltip.new(this.roleChartRoot, {
          labelText: '{categoryX}: {valueY}',
        }),
      })
    );
    series.data.setAll(data);
  }

  private createAgePieChart(data: any): void {
    this.ageChartRoot = am5.Root.new('ageChartDiv');
    this.ageChartRoot.setThemes([am5themes_Animated.new(this.ageChartRoot)]);

    const chart = this.ageChartRoot.container.children.push(
      am5pie.PieChart.new(this.ageChartRoot, {
        radius: am5.percent(80),
      })
    );

    const series = chart.series.push(
      am5pie.PieSeries.new(this.ageChartRoot, {
        valueField: 'total_users',
        categoryField: 'age_group',
      })
    );

    series.data.setAll(data);

    series.slices.template.set('tooltipText', '{categoryField}: {valueField}');
    series.labels.template.set('text', '{category}: {value}');
  }

  private createUserCreationBarChart(data: any): void {
    this.userCreationChartRoot = am5.Root.new('userCreationChartDiv');
    this.userCreationChartRoot.setThemes([am5themes_Animated.new(this.userCreationChartRoot)]);

    const chart = this.userCreationChartRoot.container.children.push(
      am5xy.XYChart.new(this.userCreationChartRoot, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(this.userCreationChartRoot, {
        categoryField: 'month',
        renderer: am5xy.AxisRendererX.new(this.userCreationChartRoot, {}),
      })
    );
    xAxis.data.setAll(data);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(this.userCreationChartRoot, {
        renderer: am5xy.AxisRendererY.new(this.userCreationChartRoot, {}),
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(this.userCreationChartRoot, {
        xAxis,
        yAxis,
        valueYField: 'total_users',
        categoryXField: 'month',
        tooltip: am5.Tooltip.new(this.userCreationChartRoot, {
          labelText: '{categoryX}: {valueY}',
        }),
      })
    );
    series.data.setAll(data);
  }
}
