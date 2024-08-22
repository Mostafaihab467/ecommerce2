export interface IStatstics{
 electronics:number,
 cloth:number,
 books:number,
 food:number,
 totalProducts:number
 pendingOrders:number,
 DeleivredOrders:number,
 paidgOrders:number,
 totalProduct:number
}



export class C_Statstics{
    electronics = 0
    cloth = 0
    books = 0
    food = 0
    totalProducts = 0
    pendingOrders =0
    paidgOrders = 0
    DeleivredOrders =0
    totalProduct=0
    constructor(electronics:number=0,cloth:number=0,books:number=0,food:number=0,totalProducts:number=0,
        DeleivredOrders:number=0,paidgOrders:number=0,pendingOrders:number=0,totalProduct:number=0){
        this.electronics = electronics
        this.cloth = cloth
        this.books = books
        this.food = food
        this.totalProducts = totalProducts
        this.DeleivredOrders = DeleivredOrders
        this.pendingOrders = pendingOrders
        this.paidgOrders = paidgOrders
        this.totalProduct =totalProduct
    }
 

    
}

export interface ISystemStats {
    cpuUsage: {
      user: string;
      system: string;
    };
    memoryUsage: {
      rss: string;
      heapTotal: string;
      heapUsed: string;
      external: string;
    };
    systemMemory: {
      totalMemory: string;
      freeMemory: string;
      usedMemory: string;
    };
    loadAverage: number[];
    uptime: number;
  }
  export class C_SystemStats implements ISystemStats {
    cpuUsage = {
      user: '0.00%',
      system: '0.00%',
    };
    memoryUsage = {
      rss: '0.00 GB',
      heapTotal: '0.00 GB',
      heapUsed: '0.00 GB',
      external: '0.00 GB',
    };
    systemMemory = {
      totalMemory: '0.00 GB',
      freeMemory: '0.00 GB',
      usedMemory: '0.00 GB',
    };
    loadAverage: number[] = [0, 0, 0];
    uptime = 0;
  
    constructor(
      userCpuPercent: string = '0.00%',
      systemCpuPercent: string = '0.00%',
      rss: string = '0.00 GB',
      heapTotal: string = '0.00 GB',
      heapUsed: string = '0.00 GB',
      external: string = '0.00 GB',
      totalMemory: string = '0.00 GB',
      freeMemory: string = '0.00 GB',
      usedMemory: string = '0.00 GB',
      loadAverage: number[] = [0, 0, 0],
      uptime: number = 0
    ) {
      this.cpuUsage.user = userCpuPercent;
      this.cpuUsage.system = systemCpuPercent;
      this.memoryUsage.rss = rss;
      this.memoryUsage.heapTotal = heapTotal;
      this.memoryUsage.heapUsed = heapUsed;
      this.memoryUsage.external = external;
      this.systemMemory.totalMemory = totalMemory;
      this.systemMemory.freeMemory = freeMemory;
      this.systemMemory.usedMemory = usedMemory;
      this.loadAverage = loadAverage;
      this.uptime = uptime;
    }
  }
  