# React核心思想
内存中维护一颗虚拟DOM树，数据变化时(setState)，自动更新虚拟DOM，得到一颗新树，然后Diff新老虚拟DOM树，找到有变化的部分，得到一个change（patch），将这个patch加入队列，最终批量更新这些patch到Dom中。  